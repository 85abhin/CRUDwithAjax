from django import forms
from .models import Studentdetails

class MyForm(forms.ModelForm):
    class Meta:
        model = Studentdetails
        fields = ['name', 'email']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control','id':'nameid'}),
            'email': forms.EmailInput(attrs={'class': 'form-control','id':'emailid'}),
        }