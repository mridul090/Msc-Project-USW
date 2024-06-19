from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
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

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def contact_us_list(request):
    contacts = ContractUs.objects.all()
    serializer = ContractUsSerializers(contacts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def reply_to_message(request, pk):
    try:
        contact_message = ContactUs.objects.get(pk=pk)
    except ContactUs.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if 'admin_reply' in request.data:
        contact_message.admin_reply = request.data['admin_reply']
        send_mail(
            f"Reply to: {contact_message.subject}",
            contact_message.admin_reply,
            settings.DEFAULT_FROM_EMAIL,
            [contact_message.email],
            fail_silently=False,
        )
        contact_message.replied_at = timezone.now()
        contact_message.save()

    serializer = ContractUsSerializers (contact_message)
    return Response(serializer.data, status=status.HTTP_200_OK)