# Generated by Django 3.1 on 2021-06-27 11:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chartapp', '0007_auto_20210626_1356'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chart',
            name='color',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='chart',
            name='data_list',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='chart',
            name='inner_labels',
            field=models.TextField(blank=True),
        ),
    ]
