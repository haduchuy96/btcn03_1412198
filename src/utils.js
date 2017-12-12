function kt_Doc(a,b,arr)
{
    var count = 1;
    var x = a + 1;
    var tmp =[];
    tmp.push(a*20+b)
    while (x < 20 && arr[a][b] == arr[x][b])
    {
        count++;
        tmp.push(x*20+b);
        x++;
    }
    x = a - 1;
    while (x >= 0 && arr[a][b] == arr[x][b])
    {
        count++;
        tmp.push(x*20+b);
        x--;
    }

    if (count==5){
        return {
            kt: true,
            arr: tmp
        }
    }

    return {
        kt: false,
        arr: tmp
    }
};

function kt_Ngang(a,b,arr)
{
    var count = 1;
    var  y = b + 1;
    var tmp =[];
    tmp.push(a*20+b)
    while (y < 20 && arr[a][b] == arr[a][y])
    {
        count++;
        tmp.push(a*20+y);
        y++;
    }
    y = b - 1;
    while (y >= 0 && arr[a][b] == arr[a][y])
    {
        count++;
        tmp.push(a*20+y);
        y--;
    }
    if (count==5){
        return {
            kt: true,
            arr: tmp
        }
    }

    return {
        kt: false,
        arr: tmp
    }

};


function kt_Cheo(a,b,arr)
{
    var count = 1;
    var  x = a + 1;
    var y = b + 1;
    var tmp =[];
    tmp.push(a*20 + b);
    while (x < 20 && y < 20 && arr[a][b] == arr[x][y])
    {
        count = count + 1;
        tmp.push(x*20 + y);
        x++;
        y++;
    }
    x = a - 1;
    y = b - 1;
    while (x >= 0 && y >= 0 && arr[a][b] == arr[x][y])
    {
        count = count + 1;
        tmp.push(x*20 + y);
        x--;
        y--;
    }

    if (count==5){
        return {
            kt: true,
            arr: tmp
        }
    }

    return {
        kt: false,
        arr: tmp
    }
};

function kt_CheoPhu(a,b,arr)
{
    var count = 1;
    var x = a + 1;
    var y = b - 1;
    var tmp =[];
    tmp.push(a*20 + b);
    while (x < 20 && y >= 0 && arr[a][b] == arr[x][y])
    {
        count++;
        tmp.push(x*20 + y);
        x++;
        y--;
    }
    x = a - 1;
    y = b + 1;
    while (x >= 0 && y < 20 && arr[a][b] == arr[x][y])
    {
        count++;
        tmp.push(x*20 + y);
        x--;
        y++;
    }

    if (count==5){
        return {
            kt: true,
            arr: tmp
        }
    }

    return {
        kt: false,
        arr: tmp
    }
};

function Total_Check(x,y,arr)
{

    if (kt_Ngang(x, y,arr).kt == true)

        return {
            kt:true,
            arr : kt_Ngang(x, y,arr).arr
        };
    if ( kt_Doc(x, y,arr).kt == true )
        return {
            kt:true,
            arr : kt_Doc(x, y,arr).arr
        };
    if (kt_Cheo(x, y,arr).kt == true )
        return {
            kt:true,
            arr : kt_Cheo(x, y,arr).arr
        };
    if (kt_CheoPhu(x, y,arr).kt)
        return {
            kt:true,
            arr : kt_CheoPhu(x, y,arr).arr
        };

    return {
        kt: false,
        arr :[]
    };
};

exports.calculateWinner = function(squares,x,y) {

    var tmparr =[] ;
    var arr = [];
    for(var i=0;i<squares.length;i++){
        if((i)%20 == 0&& i!=0){
            arr.push(tmparr);
            tmparr = [];
        }
        tmparr.push(squares[i]);
    }
    arr.push(tmparr);

    var tmp = Total_Check(x,y,arr);
    if( tmp.kt == true)
    {

        return {
            winnerLocation: tmp.arr,
            winnerPlayer: arr[x][y]
        };
    }






    return null;
}