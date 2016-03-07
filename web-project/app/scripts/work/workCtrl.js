/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

angular.module('StarbuckApp')
.controller('workCtrl',
['$scope', 'storageSer', '$location', '$timeout', 'dataSer', '$window', '$mdDialog',
function ($scope, storageSer, $location, $timeout, dataSer, $window, $mdDialog) {
    var userData = dataSer.userData;
    var dialogShow = storageSer.item('printDialogFlag');
    $scope.printing = false;
    if (!userData.name) {
        $location.path('/login');
        return;
    }
    console.log(userData);
    var date = new Date();
    $scope.print = {
        name: userData.name,
        year: date.getFullYear(),
        company: userData.company,
        department: userData.department,
        invoices: userData.invoices,
        manager: userData.manager,
        note: userData.note
    };

    function filter() {
        var m = date.getMonth() + 1;
        var d = date.getDate();
        if (String(m).length < 2) {
            m = '0' + m;
        }
        $scope.print.month = m;
        if (String(d).length < 2) {
            d = '0' + d;
        }
        $scope.print.day = d;
        
        // 总金额
        $scope.print.countMoney = 0;
        $scope.print.countNum = 0;
        for (var i = 0, l = userData.invoices.length; i < l; i ++) {
            if (userData.invoices[i] && userData.invoices[i].money && userData.invoices[i].num) {
                $scope.print.countMoney += Number(userData.invoices[i].money);
                $scope.print.invoices[i].money = formatNum(String(userData.invoices[i].money));
                $scope.print.countNum += Number(userData.invoices[i].num);
            } else {
                userData.invoices.splice(i, 1);
                i --;
                l --;
            }
        }
        $scope.print.chineseNum = numberToChinese($scope.print.countMoney);
        $scope.print.countMoney = formatNum(String($scope.print.countMoney));
    }

    filter();

    $scope.printThing = function() {
        $scope.printing = true;
        $timeout(function() {
            $window.print();
        }, 300);
    };

    // 大写转换
    function numberToChinese(n) {
        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
            return "数据非法";
        }
        var unit = "仟佰拾亿仟佰拾万仟佰拾元角分";
        var str = "";
        n += "00";
        var p = n.indexOf('.');
        if (p >= 0) {
            n = n.substring(0, p) + n.substr(p+1, 2);
        }
        unit = unit.substr(unit.length - n.length);
        for (var i=0; i < n.length; i++) {
            str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
        }
        return str.replace(/零(仟|佰|拾|角)/g, "零")
        .replace(/(零)+/g, "零")
        .replace(/零(万|亿|元)/g, "$1")
        .replace(/(亿)万|壹(拾)/g, "$1$2")
        .replace(/^元零?|零分/g, "")
        .replace(/元$/g, "元整");
    }

    // 添加千位符
    function formatNum(s){
        if (/[^0-9\.]/.test(s)) {
            return "invalid value";
        }
        s = s.replace(/^(\d*)$/,"$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s)) {
            s = s.replace(re, "$1,$2");
        }
        s = s.replace(/,(\d\d)$/, ".$1");
        return s.replace(/^\./, "0.");
    }

    if (!dialogShow) {
        $mdDialog.show(
            $mdDialog.alert()
                .title('友情提醒')
                .content('打印时，请去掉「页眉与页脚」选项，不然边边姐会觉得特别难看。')
                .ok('知道了')
        );
        storageSer.item('printDialogFlag', true);
    }
}]);
