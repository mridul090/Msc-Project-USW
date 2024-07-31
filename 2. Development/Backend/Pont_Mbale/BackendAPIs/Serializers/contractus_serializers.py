from rest_framework import serializers
from BackendAPIs.BackendModels.contractus_model import ContractUs
from users.models import CustomUser

class ContractUsSerializers (serializers.ModelSerializer):
    forwarded_to = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), many=True, required=False)

    class Meta:
        model = ContractUs
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at', 'admin_reply', 'replied_at', 'forwarded_to']
        read_only_fields = ['created_at', 'replied_at']

