# Generated by Django 3.2 on 2024-06-19 18:31

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('BackendAPIs', '0007_auto_20240615_2315'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contractus',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 19, 18, 31, 34, 899668, tzinfo=utc)),
        ),
    ]