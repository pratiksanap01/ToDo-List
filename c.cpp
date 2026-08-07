#include<iostream>
#include<math.h>
using namespace std;


struct terms{
    int coeff;
    int exp;
};

class polynomial {
    terms t[10];
    int n;
    public:
    void read();
    void display();
    void evaluate();
    void highestCoeff();
};

void polynomial :: read(){
    cout<<"enter how many terms do you want:-";
    cin>>n;

    for(int i = 0 ; i < n ; i++){
        cin>>t[i].coeff>>t[i].exp;
    }
}
void polynomial :: display(){
    cout<<"here is the polynomial";
    for(int i = 0 ; i < n-1 ; i++){
        cout<<t[i].coeff<<"x^"<<t[i].exp<<" + ";
    }
    cout<<t[n-1].coeff<<t[n-1].exp;
}

void polynomial :: evaluate(){
    int x;
    cout<<"Enter the value of x:-";
    cin>>x;
    int sum = 0;
    for(int i = 0 ; i< n ; i++){
        sum+= t[i].coeff * pow(x,t[i].exp);
    }
    cout<< " the evaluation of the polynomial is "<<sum;
}
void polynomial :: highestCoeff(){
    int max = t[0].coeff;
    for(int i = 1; i < n ; i ++)
    {
        if(t[i].coeff > max )
        {
            max = t[i].coeff;
        }
    }
    cout<<"the highest coefficient is:-"<<max;
}
int main(){
    polynomial p1;
    p1.read();
    p1.display();
    p1.evaluate();
    return 0;
}