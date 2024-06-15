from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from BackendAPIs.BackendModels.contractus_model import ContractUs
from BackendAPIs.Serializers.contractus_serializers import ContractUsSerializers

@extend_schema(responses=ContractUsSerializers)
@api_view(['POST'])
def create_contract_us(request):
    if request.method == "POST":
        serializer = ContractUsSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)