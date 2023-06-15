function getElement(selector) {
    return document.querySelector(selector)
}

var dsnv = new DSNV()

getElement('#btnThemNV').onclick = function () {
    var tknv = getElement('#tknv').value;
    var name = getElement('#name').value;
    var email = getElement('#email').value;
    var password = getElement('#password').value;
    var datePicker = getElement('#datepicker').value;
    var luongCB = +getElement('#luongCB').value;
    var chucVu = getElement('#chucvu').value;
    var gioLam = +getElement('#gioLam').value;

    var nhanVien = new NhanVien(tknv, name, email, password, datePicker, luongCB, chucVu, gioLam)

    dsnv.themNV(nhanVien)
    console.log(dsnv.arrNV)
    rendersnv()
}

function rendersnv() {
    var content = []
    for (var i = 0; i < dsnv.arrNV.length; i++) {
        var nv = dsnv.arrNV[i]
        content += `
        <tr>
            <td>${nv.tknv}</td>
            <td>${nv.name}</td>
            <td>${nv.email}</td>
            <td>${nv.datePicker}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong()}</td>
            <td>${nv.xepLoai()}</td>
            <td><button class='btn btn-danger'>Edit</button></td>
        </tr>
        `
    }

    getElement('#tableDanhSach').innerHTML = content
}