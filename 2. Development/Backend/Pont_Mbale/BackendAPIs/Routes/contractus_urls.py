from django.urls import path
from BackendAPIs.Views.contractus_views import create_contract_us

urlpatterns = [
    path('contractus/create/', create_contract_us, name= 'create_contract_us'),
]