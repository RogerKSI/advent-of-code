#include <bits/stdc++.h>
using namespace std;

int main(int argc, char **argv)
{
    freopen(argv[1], "r", stdin);

    int lines;
    cin >> lines;

    int last = 0;
    int answer = 0;
    for (int i = 0; i <= lines; i++)
    {
        int tmp;
        cin >> tmp;
        if (i > 0 && tmp > last)
        {
            answer++;
        }
        last = tmp;
    }

    cout << answer;
}
