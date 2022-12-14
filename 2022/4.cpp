#include <bits/stdc++.h>
using namespace std;

int main(int argc, char **argv)
{
    freopen(argv[1], "r", stdin);

    int answer = 0;
    int lines;
    scanf("%d", &lines);

    for (int i = 0; i < lines; i++)
    {
        int a, b, c, d;
        scanf("%d-%d,%d-%d", &a, &b, &c, &d);
        if ((d >= a && c <= b) || (b >= c && a <= d))
            answer++;
    }

    cout << answer;
}
