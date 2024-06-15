from rest_framework import serializers
from BackendAPIs.BackendModels.blog_model import BlogPost, Tag, Category
# from django.contrib.auth.models import User


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'slug']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email']


class BlogPostSerializer(serializers.ModelSerializer):
    # author = UserSerializer(read_only=True)
    tags = TagSerializer(many=True, required=False)
    category = CategorySerializer(required=False)
    slug = serializers.SlugField(read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'content',
            # 'author',
            'created_at', 'updated_at', 'slug',
            'status', 'tags', 'category'
        ]

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        category_data = validated_data.pop('category', None)
        request = self.context.get('request', None)
        # author = request.user if request else None
        # blog_post = BlogPost.objects.create(author=author, **validated_data)
        blog_post = BlogPost.objects.create(author=None, **validated_data)

        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(**tag_data)
            blog_post.tags.add(tag)

        if category_data:
            category, created = Category.objects.get_or_create(**category_data)
            blog_post.category = category
            blog_post.save()

        return blog_post

    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', [])
        category_data = validated_data.pop('category', None)

        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.status = validated_data.get('status', instance.status)
        instance.save()

        instance.tags.clear()
        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(**tag_data)
            instance.tags.add(tag)

        if category_data:
            category, created = Category.objects.get_or_create(**category_data)
            instance.category = category

        instance.save()
        return instance
