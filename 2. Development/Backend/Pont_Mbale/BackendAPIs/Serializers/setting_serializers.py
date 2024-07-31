from rest_framework import serializers
from BackendAPIs.BackendModels.setting_model import ImageLibrary

class ImageLibrarySerializers(serializers.ModelSerializer):
    class Meta:
        model = ImageLibrary
        fields = ['id', 'title', 'image', 'uploaded_time']
        read_only_fields = ['uploaded_time']

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        if 'image' in validated_data:
            instance.image = validated_data['image']
        instance.save()
        return instance
