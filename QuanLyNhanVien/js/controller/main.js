function getElement(element) {
    return document.querySelector(element)
}
var dsnv = new DSNV()
function getThongTinNhanVien(isEdit) {
    var taiKhoan = getElement('#tknv').value
    var hoVaTen = getElement('#name').value
    var email = getElement('#email').value
    var password = getElement('#password').value
    var ngayLam = getElement('#datepicker').value
    var luongCoBan = +getElement('#luongCB').value
    var chucVu = getElement('#chucvu').value
    var gioLam = +getElement('#gioLam').value
    var nhanVien = new NhanVien(taiKhoan, hoVaTen, email, password, ngayLam, luongCoBan, chucVu, gioLam,)
    var isVaild = true

    isVaild &=
        kiemTraNoiDung(nhanVien.taiKhoan, 1, undefined, '#tbTKNV', '.sp-thongbao1', "*Tài khoản không được để trống.") &&
        kiemTraNoiDung(nhanVien.taiKhoan, 4, 6, '#tbTKNV', '.sp-thongbao1', "*Tài khoản tối đa 4-6 kí tự.") &&
        kiemTraMaNV(nhanVien.taiKhoan, dsnv.arrNV, isEdit, '#tbTKNV', '.sp-thongbao1', '*Tài khoản nhân viên đã tồn tại')

    isVaild &=
        kiemTraNoiDung(nhanVien.hoVaTen, 1, undefined, '#tbTen', '.sp-thongbao2', "*Họ và tên không được để trống.") &&
        kiemTraPattern(nhanVien.hoVaTen, '#tbTen', '.sp-thongbao2', /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/, '*Họ và tên chưa đúng định dạng')

    isVaild &=
        kiemTraNoiDung(nhanVien.email, 1, undefined, '#tbEmail', '.sp-thongbao3', "*Email không được để trống.") &&
        kiemTraPattern(nhanVien.email, '#tbEmail', '.sp-thongbao3', /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, '*Email chưa đúng định dạng')

    isVaild &=
        kiemTraNoiDung(nhanVien.password, 1, undefined, '#tbMatKhau', '.sp-thongbao4', "*Mật khẩu không được để trống.") &&
        kiemTraNoiDung(nhanVien.password, 6, 10, '#tbMatKhau', '.sp-thongbao4', "*Mật khẩu tối đa 6-10 kí tự.") &&
        kiemTraPattern(nhanVien.password, '#tbMatKhau', '.sp-thongbao4', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/, '*chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt')

    isVaild &=
        kiemTraNoiDung(nhanVien.ngayLam, 1, undefined, '#tbNgay', '.sp-thongbao5', "*Ngày tháng không được để trống.") &&
        kiemTraPattern(nhanVien.ngayLam, '#tbNgay', '.sp-thongbao5', /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/, '*chưa đúng định dạng')

    isVaild &=
        kiemTraSo(nhanVien.luongCoBan, 1, undefined, '#tbLuongCB', '.sp-thongbao6', "*Số lương không được để trống.") &&
        kiemTraPattern(nhanVien.luongCoBan, '#tbLuongCB', '.sp-thongbao6', /^[0-9]+$/, '*Không đúng định dạng') &&
        kiemTraSo(nhanVien.luongCoBan, 1000000, 20000000, '#tbLuongCB', '.sp-thongbao6', "*Số lương không hợp lệ.")

    isVaild &=
        kiemTraChucVu(nhanVien.chucVu, '#tbChucVu', '.sp-thongbao7', '*Tùy chọn không hợp lệ')

    isVaild &=
        kiemTraSo(nhanVien.gioLam, 1, undefined, '#tbGiolam', '.sp-thongbao8', "*Số giờ làm không được để trống.") &&
        kiemTraSo(nhanVien.gioLam, 80, 200, '#tbGiolam', '.sp-thongbao8', "*Số giờ làm không hợp lệ.")

    return isVaild ? nhanVien : undefined
}

function renderdsnv(arrNV = dsnv.arrNV) {
    var content = ''
    for (var i = 0; i < arrNV.length; i++) {
        var nv = arrNV[i]
        content += `<tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoVaTen}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tongLuong()}</td>
        <td>${nv.xepLoai()}</td>
        <td>
        <button class='btn btn-danger mt-2' onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
        <button class="btn btn-primary mt-2" data-toggle="modal" data-target="#myModal" onclick="chinhSuaNhanVien('${nv.taiKhoan}')">Edit</button>
        </td>
        </tr>`
    }
    getElement('#tableDanhSach').innerHTML = content
}

function setLocalStorage() {
    var data = JSON.stringify(dsnv.arrNV)
    localStorage.setItem('DSNV', data)
}

function getLocalStorage() {
    var data = localStorage.getItem('DSNV')
    if (data) {
        var parseData = JSON.parse(data)
        var arr = []
        for (var i = 0; i < parseData.length; i++) {
            var nv = parseData[i]
            var nhanVien = new NhanVien(nv.taiKhoan, nv.hoVaTen, nv.email, nv.matKhau, nv.ngayLam, nv.luongCoBan, nv.chucVu, nv.gioLam,)
            arr.push(nhanVien)
        }
        dsnv.arrNV = arr
        renderdsnv()
    }
}
getLocalStorage()
function xoaNhanVien(taiKhoan) {
    dsnv.xoaNV(taiKhoan)
    renderdsnv()
    setLocalStorage()
}

function chinhSuaNhanVien(taiKhoan) {
    chuyenDoiThe('.sp-thongbao1', '.sp-thongbao2', '.sp-thongbao3', '.sp-thongbao4', '.sp-thongbao5', '.sp-thongbao6', '.sp-thongbao7', '.sp-thongbao8',)
    getElement('#tknv').disabled = true
    getElement('#btnThemNV').style.display = 'none'
    getElement('#btnCapNhat').style.display = 'block'
    var index = dsnv.timNV(taiKhoan)
    var nv = dsnv.arrNV[index]
    getElement('#tknv').value = nv.taiKhoan
    getElement('#name').value = nv.hoVaTen
    getElement('#email').value = nv.email
    getElement('#password').value = nv.password
    getElement('#datepicker').value = nv.ngayLam
    getElement('#luongCB').value = nv.luongCoBan
    getElement('#chucvu').value = nv.chucVu
    getElement('#gioLam').value = nv.gioLam
}

getElement('#btnCapNhat').onclick = function () {
    var nhanVien = getThongTinNhanVien(true)
    dsnv.capNhat(nhanVien)
    renderdsnv()
    setLocalStorage()
    getElement('#formQLNV').reset()
}

getElement('#btnThemNV').onclick = function () {
    getElement('#btnCapNhat').style.display = 'none'
    var nv = getThongTinNhanVien(false)
    if (nv) {
        dsnv.themNV(nv)
        renderdsnv()
        setLocalStorage()
        getElement('#formQLNV').reset()
    }

}

getElement('#searchName').addEventListener('keyup', function () {
    var valueSearch = getElement('#searchName').value.toLowerCase()
    var arrNvSearch = []
    console.log(arrNvSearch)
    for (var i = 0; i < dsnv.arrNV.length; i++) {
        var tenNV = dsnv.arrNV[i].xepLoai().toLowerCase()
        if (tenNV.indexOf(valueSearch) !== -1) {
            arrNvSearch.push(dsnv.arrNV[i])
        }
    }
    renderdsnv(arrNvSearch)
})
getElement('#btnThem').onclick = function () {
    getElement('#tknv').disabled = false
    chuyenDoiThe('.sp-thongbao1', '.sp-thongbao2', '.sp-thongbao3', '.sp-thongbao4', '.sp-thongbao5', '.sp-thongbao6', '.sp-thongbao7', '.sp-thongbao8',)
    getElement('#btnThemNV').style.display = 'block'
    getElement('#btnCapNhat').style.display = 'none'
    getElement('#formQLNV').reset()
}



