from django.db import models
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from PIL import Image
from io import BytesIO
from django.core.files import File
import os

class ImageLibrary(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='media/images/')
    uploaded_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"image {self.image}, title {self.title}, id {self.id}"

    def save(self, *args, **kwargs):
        if self.image:
            self.image = self.resize_image(self.image)
        super(ImageLibrary, self).save(*args, **kwargs)

    def resize_image(self, image, size=(700, 700)):
        img = Image.open(image)
        if img.width > size[0] or img.height > size[1]:
            img.thumbnail(size, Image.LANCZOS)

            thumb_io = BytesIO()
            img.save(thumb_io, img.format, quality=85)

            new_image = File(thumb_io, name=image.name)
            return new_image
        return image

@receiver(pre_save, sender=ImageLibrary)
def delete_old_image(sender, instance, **kwargs):
    if not instance.pk:
        return False

    try:
        old_image = sender.objects.get(pk=instance.pk).image
    except sender.DoesNotExist:
        return False

    new_image = instance.image
    if not old_image == new_image:
        if old_image:
            if os.path.isfile(old_image.path):
                os.remove(old_image.path)

@receiver(post_delete, sender=ImageLibrary)
def delete_image_file(sender, instance, **kwargs):
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)
