from django.db import models
from django.utils import timezone
from users.models import CustomUser


class ContractUs(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    forwarded_to = models.ManyToManyField(CustomUser, related_name='contract_messages', blank=True)
    subject = models.CharField(max_length=100)
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    admin_reply = models.TextField(blank=True, null=True)
    replied_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name = "Contract Messages"
        verbose_name_plural = "Contract Messages"

    def __str__(self):
        return f"Message from {self.name} - {self.email}"

    


