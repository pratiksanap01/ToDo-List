#include<iostream>
using namespace std;

struct terms{
    int coeff;
    int exp;
};

class polynomial {
    public:
        terms t[10];
        int n;

    public: 
        void create();

}

void polynomial :: create() {
    cout<<"Enter no. of trems";
    cin>>n;

    cout<<"enter coeff and exp of polynomial";
    for(int i = 0; i<n-1;i++){
        
    }
}