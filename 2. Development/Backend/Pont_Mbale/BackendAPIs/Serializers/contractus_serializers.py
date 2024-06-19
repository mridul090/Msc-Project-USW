from rest_framework import serializers
from BackendAPIs.BackendModels.contractus_model import ContractUs

class ContractUsSerializers (serializers.ModelSerializer):
    class Meta:
        model = ContractUs
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at', 'admin_reply', 'replied_at']
        read_only_fields = ['created_at', 'replied_at']

