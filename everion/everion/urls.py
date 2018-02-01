"""everion URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from plot import views
from django.conf.urls.static import static
from everion import settings
from plot import views_rest_patient
from plot import views_rest_reading
from plot import views_rest_file

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index),
    url(r'^plot$', views.plotter),
    url(r'^generate$', views.generate_dummies),
    url(r'^api/patients/$', views_rest_patient.patient_list),
    url(r'^api/patients/(?P<id>[0-9]+)/$', views_rest_patient.patient_details),
    url(r'^api/patients/(?P<id>[0-9]+)/readings/$', views_rest_reading.reading_list),
    url(r'^api/patients/(?P<pk>[0-9]+)/files/upload/(?P<filename>.+)$', views_rest_file.FileUploadView.as_view()),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
