# Generated by Django 3.2 on 2024-06-15 16:59

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('BackendAPIs', '0004_alter_contractus_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contractus',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 15, 16, 59, 30, 364903, tzinfo=utc)),
        ),
    ]
