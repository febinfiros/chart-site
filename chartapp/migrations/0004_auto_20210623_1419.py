# Generated by Django 3.1 on 2021-06-23 11:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chartapp', '0003_auto_20210623_1419'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chart',
            name='parentproject',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chartapp.project'),
        ),
    ]
