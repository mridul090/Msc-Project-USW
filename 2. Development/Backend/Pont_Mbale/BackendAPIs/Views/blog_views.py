from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from BackendAPIs.BackendModels.blog_models import BlogPost, Tag, Category
from BackendAPIs.Serializers.blog_serializers import BlogPostSerializer, CategorySerializer, TagSerializer

# Create your views here.

# All blog post related create, update and delete API's

@extend_schema(responses=BlogPostSerializer)
@api_view(['GET'])
def View_BlogPost(request):
    blogs = BlogPost.objects.all()
    serializer = BlogPostSerializer(blogs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@extend_schema(responses=BlogPostSerializer)
@api_view(['POST'])
def Create_BlogPost(request):
    serializer = BlogPostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@extend_schema(responses=BlogPostSerializer)
@api_view(['PUT'])
def Update_BlogPost(request, pk):
    try:
        blogs = BlogPost.objects.get(pk=pk)
    except BlogPost.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = BlogPostSerializer(blogs, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

# Tag API
@extend_schema(responses=TagSerializer)
@api_view(['GET'])
def View_tag(request):
    tag = Tag.objects.all()
    serializer = TagSerializer(tag, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@extend_schema(responses=TagSerializer)
@api_view(['POST'])
def Create_tag(request):
    serializer = TagSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Category API
@extend_schema(responses=CategorySerializer)
@api_view(['GET'])
def View_Category(request):
    category = Category.objects.all()
    serializer = CategorySerializer(category, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@extend_schema(responses=CategorySerializer)
@api_view(['POST'])
def Create_Category(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)