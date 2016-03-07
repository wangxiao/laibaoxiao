/**
 * @author wangxiao
 *
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

angular.module('StarbuckApp')
.controller('loginCtrl',
['$scope', 'storageSer', 'dataSer', '$location', '$mdDialog',
function ($scope, storageSer, dataSer, $location, $mdDialog) {
    var userData = JSON.parse(storageSer.item('userData')) || {};
    var dialogShow = storageSer.item('dialogFlag');
    var noteTipShow = false;
    $scope.ui = {
        companys: dataSer.companys,
        departments: dataSer.departments,
        managers: dataSer.managers,
        invoices: dataSer.invoices
    };
    $scope.userData = {
        name: userData.name || '',
        company: userData.company || '',
        department: userData.department || '',
        manager: userData.manager || '',
        note: '',
        invoices: [{
            invoice: $scope.ui.invoices[0],
            num: undefined,
            money: undefined
        }]
    };
    $scope.addNewItem = function() {
        if ($scope.userData.invoices.length >= 5) {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('提示')
                    .content('一页报销单最多支持五行，如果超出请另填一页报销单。')
                    .ok('好的')
            );
        } else {
            $scope.userData.invoices.push({
                invoice: $scope.ui.invoices[0],
                num: undefined,
                money: undefined
            });
        }
    };
    $scope.removeItem = function(index) {
        if ($scope.userData.invoices.length > 1) {
            $scope.userData.invoices.splice(index, 1);
        }
    };
    $scope.submit = function() {
        if ($scope.userData.name) {
            storageSer.item('userData', $scope.userData);
            dataSer.userData = $scope.userData;
            $location.path('/work');
        }
    };

    if (!dialogShow) {
        $mdDialog.show(
            $mdDialog.alert()
                .title('欢迎使用')
                .content('首次使用前，麻烦您确认已经配置好打印机。不知道如何配置，可以找负责行政的同事。')
                .ok('知道了')
        );
        storageSer.item('dialogFlag', true);
    }

    $scope.showNoteTip = function() {
        if (!noteTipShow) {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('友情提醒')
                    .content('「备注」这项不能瞎写，是给特殊情况准备的，比如招待费明细之类的。一般情况不需要，如果需要填写找负责财务的同事确认，否则可能导致报销单无效。')
                    .ok('知道了')
            );
            noteTipShow = true;
        }
    };
}]);
