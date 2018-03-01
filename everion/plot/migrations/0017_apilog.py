# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-03-01 07:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plot', '0016_auto_20180216_1823'),
    ]

    operations = [
        migrations.CreateModel(
            name='ApiLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('description', models.CharField(max_length=2000)),
            ],
        ),
    ]