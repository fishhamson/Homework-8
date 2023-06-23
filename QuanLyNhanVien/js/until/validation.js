
function kiemTraNoiDung(value, minLength, maxLength, content, span, messErr) {
    if (value.trim().length < minLength || value.trim().length > Number(maxLength)) {
        getElement(span).style.display = "block"
        getElement(content).innerHTML = messErr
        return false
    } else {
        getElement(span).style.display = 'none'
        return true
    }
}

function kiemTraMaNV(maNV, dsnv, isEdit, content, span, messErr) {
    if (isEdit) return true

    var isFlag = true
    for (var i = 0; i < dsnv.length; i++) {
        if (dsnv[i].taiKhoan === maNV) {
            isFlag = false
            break
        }
    }

    if (isFlag) {
        getElement(content).innerHTML = ''
        getElement(span).style.display = "none"
        return true
    }

    if (!isFlag) {
        getElement(span).style.display = "block"
        getElement(content).innerHTML = messErr
        return false
    }
}


function kiemTraPattern(value, content, span, pattern, messErr) {
    if (!pattern.test(value)) {
        getElement(span).style.display = "block"
        getElement(content).innerHTML = messErr
        return false
    }
    getElement(span).style.display = 'none'
    getElement(content).innerHTML = ''
    return true
}

function kiemTraSo(value, min, max, content, span, messErr) {
    if (value < min || value > Number(max)) {
        getElement(span).style.display = "block"
        getElement(content).innerHTML = messErr
        return false
    } else {
        getElement(span).style.display = "none"
        return true
    }
}

function kiemTraChucVu(value, content, span, messErr) {
    if (value === 'Sếp') {
        getElement(span).style.display = "none"
        return true
    } else if (value === 'Trưởng phòng') {
        getElement(span).style.display = "none"
        return true
    } else if (value === 'Nhân viên') {
        getElement(span).style.display = "none"
        return true
    } else {
        getElement(span).style.display = "block"
        getElement(content).innerHTML = messErr
        return false
    }
}

function chuyenDoiThe(content1, content2, content3, content4, content5, content6, content7, content8) {
    getElement(content2).style.display = 'none'
    getElement(content3).style.display = 'none'
    getElement(content4).style.display = 'none'
    getElement(content5).style.display = 'none'
    getElement(content6).style.display = 'none'
    getElement(content7).style.display = 'none'
    getElement(content8).style.display = 'none'
    getElement(content1).style.display = 'none'
}
