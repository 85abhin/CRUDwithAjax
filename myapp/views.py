from django.shortcuts import render
from .models import Studentdetails
from .forms import MyForm
from  django.http import JsonResponse
# Create your views here.
def home(request):
    student_details=Studentdetails.objects.all()
    if request.method == 'POST':
        form = MyForm(request.POST)
        if form.is_valid():
            form.save()  
    else:
        form = MyForm()
    return render(request,'myapp/home.html',{'students':student_details,'form':form})


def save_data(request):
    if request.method == 'POST':
        form = MyForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            stu = Studentdetails(name=name,email=email)
            stu.save()
            stu = Studentdetails.objects.values()
            print(stu)
            student_data=list(stu)
            return JsonResponse({'status' :'Save','student_data':student_data})
           
        else:
            return JsonResponse({'status' : 0})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
    

def delete_data(request):
    if request.method == 'POST':
       id=request.POST.get('sid')
       print(id)
       pi=Studentdetails.objects.get(pk=id)
       pi.delete()
       return JsonResponse({'status':1})
    else:
        return JsonResponse({'status': 0})
    
def edit_data(request):
    if request.method == "POST":
        id = request.POST.get('sid')
        stu=Studentdetails.objects.get(pk=id)
        student_data = {"id":stu.id, "name" : stu.name, "email":stu.email}
        return JsonResponse(student_data)