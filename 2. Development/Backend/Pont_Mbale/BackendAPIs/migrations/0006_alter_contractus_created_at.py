# Generated by Django 3.2 on 2024-06-15 17:03

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('BackendAPIs', '0005_alter_contractus_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contractus',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 15, 17, 3, 19, 476380, tzinfo=utc)),
        ),
    ]
