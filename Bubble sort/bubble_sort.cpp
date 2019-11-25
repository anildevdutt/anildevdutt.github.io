#include <iostream>
using namespace std;

void sort(int* ar, int s)
{
    for(int i = 0; i < s - 1; i++)
    {
        bool sorted = true;
        for(int j = 0; j < s - 1 - i; j++)
        {
            if(ar[j] > ar[j + 1])
            {
                int tmp = ar[j];
                ar[j] = ar[j + 1];
                ar[j + 1] = tmp;
                sorted = false;
            }
        }
        if(sorted == true)
            break;
    }
}

void show(int* ar, int s)
{
    for(int i = 0; i < s; i++)
        cout << ar[i] << " ";
    cout << endl;
}

int main() 
{
    int ar[] = {10, 13, 4, 6, 9};
    sort(ar, 5);
    show(ar, 5);
    return 0;
}