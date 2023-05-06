# Generated by Django 4.1.7 on 2023-05-06 19:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('dogs', '0029_alter_userprofile_country'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dog',
            name='users',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='dogs_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='dogowner',
            name='users',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='dogowners_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='owner',
            name='users',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='owners_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='toy',
            name='users',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='toys_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
