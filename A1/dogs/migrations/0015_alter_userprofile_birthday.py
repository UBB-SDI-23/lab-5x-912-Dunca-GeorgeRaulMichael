# Generated by Django 4.1.7 on 2023-04-29 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dogs', '0014_alter_userprofile_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='birthday',
            field=models.DateField(null=True),
        ),
    ]
