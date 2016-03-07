/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */
angular.module('StarbuckApp')
.factory('dataSer', 
['$window', '$q',
function($window, $q) {
    return {
        userData: {
        },
        companys: [
            '美味书签（北京）信息技术有限公司',
            '品悦创智（北京）技术咨询有限公司'
        ],
        departments: [
            '研发部',
            '行政部',
            '财务部',
            '市场部',
            '人事部',
            '总经理'
        ],
        managers: [
            '丰俊文',
            '江宏',
            '庄晓丹',
            '吴雅琪',
            '边明博',
            '（无）'
        ],
        invoices: [
            '工作餐费',
            '办公用品',
            '图书报刊',
            '交通费',
            '招待费',
            '培训费',
            '食品日用',
            '邮电网络通讯费',
            '差旅费-往返费用',
            '差旅费-市内交通',
            '差旅费-伙食补贴',
            '差旅费-住宿费'
        ]
    };
    // 结束 
}]);
