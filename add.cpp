#include<iostream>
#include<cmath>
using namespace std;

struct term{
    int c,e;
};

class Polynomial{
    term t[10];
    int n;
    public : 
        void create();
        void display();
        void add(Polynomial p1,Polynomial p2);
};
void Polynomial::create()
{
    cout<<"Enter no of terms: ";
    cin>>n;
    cout<<"Enter coeddicient and exponenet: ";
    for(int i=0;i<n;i++){
        cin>>t[i].c>>t[i].e;
    }
}
void Polynomial::display()
{
    cout<<"polynomial is: "<<endl;
    for(int i=0;i<n;i++){
        cout<<t[i].c<<"x^"<<t[i].e<<" + ";
    }
    cout<<"\b"<<endl;
}
void Polynomial::add(Polynomial p1, Polynomial p2)
{
    int t1,t2;
    t1=p1.n;
    t2=p2.n;
    int i=0,j=0,k=0;
    while(i<t1 && j<t2)
    {
        if(p1.t[i].e == p2.t[j].e)
        {//logic when exponents are equal
            t[k].c=p1.t[i].c+p2.t[j].c;
            t[k].e=p1.t[i].e;
            i++;
            j++;
            k++;
        }
        else if(p1.t[i].e > p2.t[j].e)
        {//exponent of first polynomial is greater
            t[k].c=p1.t[i].c;
            t[k].e=p1.t[i].e;
            i++;
            k++;
        }
        else{
            // ecponent of second polynomial is greater
            t[k].c=p2.t[j].c;
            t[k].e=p2.t[j].e;
            j++;
            k++;
        }
    
    }
    while (i<t1)
    {
        t[k].c=p1.t[i].c;
        t[k].e=p1.t[i].e;
        i++;
        k++;
    }
    while (j<t2)
    {
        t[k].c=p2.t[j].c;
        t[k].e=p2.t[j].e;
        j++;
        k++;
    }
    n=k;
}
int main()
{
    Polynomial p1,p2,p3;
    cout<<"---First Polynomail---"<<endl;
    p1.create();
    p1.display();
  

    cout<<"---Second Polynomail---"<<endl;
    p2.create();
    p2.display();

    cout<<"---Addition of Polynomial---"<<endl;
    p3.add(p1,p2);
    p3.display();

    return 0;
}