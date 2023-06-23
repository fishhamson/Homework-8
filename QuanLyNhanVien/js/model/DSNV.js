function DSNV() {
    this.arrNV = []

    this.themNV = function (nhanVien) {
        this.arrNV.push(nhanVien)
    }

    this.timNV = function (taiKhoan) {
        for (var i = 0; i < this.arrNV.length; i++) {
            var maNV = this.arrNV[i].taiKhoan
            if (maNV === taiKhoan) {
                return i
            }
        }
        return -1
    }

    this.xoaNV = function (taiKhoanNhanVien) {
        var index = this.timNV(taiKhoanNhanVien)
        if (index !== -1) {
            this.arrNV.splice(index, 1)
        }
    }

    this.capNhat = function (nhanVien) {
        var index = this.timNV(nhanVien.taiKhoan)
        if (index !== -1) {
            this.arrNV[index] = nhanVien
        }
    }
}