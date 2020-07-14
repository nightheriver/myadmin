
export const datesc =(code)=>{
    let time = new Date(code)
                , year = time.getFullYear()
                , month = time.getMonth()+1 < 10 ? '0' +(time.getMonth() + 1)  : time.getMonth()+1
                , date = time.getDate()
                , hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
                , min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
                , sec = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    return year + '-' + month + '-' + date + '   ' + hour + ':' + min + ':' + sec
}