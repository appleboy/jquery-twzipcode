/**
 * jQuery TWzipcode plugin
 * https://code.essoduke.org/twzipcode/
 * Copyright 2016 essoduke.org, Licensed MIT.
 *
 * Changelog
 * -------------------------------
 * 修正使用 html data-value 的方式傳入預設值無效的錯誤。
 *
 * @author essoduke.org
 * @version 1.7.8
 * @license MIT License
 */
;(function ($, window, document, undefined) {

    'use strict';

    // Zipcode JSON data
    var data = {
        '基隆市': {'仁愛區': '200', '信義區': '201', '中正區': '202', '中山區': '203', '安樂區': '204', '暖暖區': '205', '七堵區': '206'},
        '台北市': {'中正區': '100', '大同區': '103', '中山區': '104', '松山區': '105', '大安區': '106', '萬華區': '108', '信義區': '110', '士林區': '111', '北投區': '112', '內湖區': '114', '南港區': '115', '文山區': '116'},
        '新北市': {
          '萬里區': '207', '金山區': '208', '板橋區': '220', '汐止區': '221', '深坑區': '222', '石碇區': '223',
          '瑞芳區': '224', '平溪區': '226', '雙溪區': '227', '貢寮區': '228', '新店區': '231', '坪林區': '232',
          '烏來區': '233', '永和區': '234', '中和區': '235', '土城區': '236', '三峽區': '237', '樹林區': '238',
          '鶯歌區': '239', '三重區': '241', '新莊區': '242', '泰山區': '243', '林口區': '244', '蘆洲區': '247',
          '五股區': '248', '八里區': '249', '淡水區': '251', '三芝區': '252', '石門區': '253'
        },
        '宜蘭縣': {
          '宜蘭市': '260', '頭城鎮': '261', '礁溪鄉': '262', '壯圍鄉': '263', '員山鄉': '264', '羅東鎮': '265',
          '三星鄉': '266', '大同鄉': '267', '五結鄉': '268', '冬山鄉': '269', '蘇澳鎮': '270', '南澳鄉': '272',
          '釣魚台列嶼': '290'
        },
        '新竹市': {'東區': '300', '北區': '300', '香山區': '300'},
        '新竹縣': {
          '竹北市': '302', '湖口鄉': '303', '新豐鄉': '304', '新埔鎮': '305', '關西鎮': '306', '芎林鄉': '307',
          '寶山鄉': '308', '竹東鎮': '310', '五峰鄉': '311', '橫山鄉': '312', '尖石鄉': '313', '北埔鄉': '314',
          '峨嵋鄉': '315'
        },
        '桃園市': {
          '中壢區': '320', '平鎮區': '324', '龍潭區': '325', '楊梅區': '326', '新屋區': '327', '觀音區': '328',
          '桃園區': '330', '龜山區': '333', '八德區': '334', '大溪區': '335', '復興區': '336', '大園區': '337',
          '蘆竹區': '338'
        },
        '苗栗縣': {
          '竹南鎮': '350', '頭份市': '351', '三灣鄉': '352', '南庄鄉': '353', '獅潭鄉': '354', '後龍鎮': '356',
          '通霄鎮': '357', '苑裡鎮': '358', '苗栗市': '360', '造橋鄉': '361', '頭屋鄉': '362', '公館鄉': '363',
          '大湖鄉': '364', '泰安鄉': '365', '銅鑼鄉': '366', '三義鄉': '367', '西湖鄉': '368', '卓蘭鎮': '369'
        },
        '台中市': {
          '中區': '400', '東區': '401', '南區': '402', '西區': '403', '北區': '404', '北屯區': '406', '西屯區': '407', '南屯區': '408',
          '太平區': '411', '大里區': '412', '霧峰區': '413', '烏日區': '414', '豐原區': '420', '后里區': '421',
          '石岡區': '422', '東勢區': '423', '和平區': '424', '新社區': '426', '潭子區': '427', '大雅區': '428',
          '神岡區': '429', '大肚區': '432', '沙鹿區': '433', '龍井區': '434', '梧棲區': '435', '清水區': '436',
          '大甲區': '437', '外埔區': '438', '大安區': '439'
        },
        '彰化縣': {
          '彰化市': '500', '芬園鄉': '502', '花壇鄉': '503', '秀水鄉': '504', '鹿港鎮': '505', '福興鄉': '506',
          '線西鄉': '507', '和美鎮': '508', '伸港鄉': '509', '員林市': '510', '社頭鄉': '511', '永靖鄉': '512',
          '埔心鄉': '513', '溪湖鎮': '514', '大村鄉': '515', '埔鹽鄉': '516', '田中鎮': '520', '北斗鎮': '521',
          '田尾鄉': '522', '埤頭鄉': '523', '溪州鄉': '524', '竹塘鄉': '525', '二林鎮': '526', '大城鄉': '527',
          '芳苑鄉': '528', '二水鄉': '530'
        },
        '南投縣': {
          '南投市': '540', '中寮鄉': '541', '草屯鎮': '542', '國姓鄉': '544', '埔里鎮': '545', '仁愛鄉': '546',
          '名間鄉': '551', '集集鎮': '552', '水里鄉': '553', '魚池鄉': '555', '信義鄉': '556', '竹山鎮': '557',
          '鹿谷鄉': '558'
        },
        '嘉義市': {'東區': '600', '西區': '600'},
        '嘉義縣': {
          '番路鄉': '602', '梅山鄉': '603', '竹崎鄉': '604', '阿里山': '605', '中埔鄉': '606', '大埔鄉': '607',
          '水上鄉': '608', '鹿草鄉': '611', '太保市': '612', '朴子市': '613', '東石鄉': '614', '六腳鄉': '615',
          '新港鄉': '616', '民雄鄉': '621', '大林鎮': '622', '溪口鄉': '623', '義竹鄉': '624', '布袋鎮': '625'
        },
        '雲林縣': {
          '斗南鎮': '630', '大埤鄉': '631', '虎尾鎮': '632', '土庫鎮': '633', '褒忠鄉': '634', '東勢鄉': '635',
          '臺西鄉': '636', '崙背鄉': '637', '麥寮鄉': '638', '斗六市': '640', '林內鄉': '643', '古坑鄉': '646',
          '莿桐鄉': '647', '西螺鎮': '648', '二崙鄉': '649', '北港鎮': '651', '水林鄉': '652', '口湖鄉': '653',
          '四湖鄉': '654', '元長鄉': '655'
        },
        '台南市': {
          '中西區': '700', '東區': '701', '南區': '702', '北區': '704', '安平區': '708', '安南區': '709',
          '永康區': '710', '歸仁區': '711', '新化區': '712', '左鎮區': '713', '玉井區': '714', '楠西區': '715',
          '南化區': '716', '仁德區': '717', '關廟區': '718', '龍崎區': '719', '官田區': '720', '麻豆區': '721',
          '佳里區': '722', '西港區': '723', '七股區': '724', '將軍區': '725', '學甲區': '726', '北門區': '727',
          '新營區': '730', '後壁區': '731', '白河區': '732', '東山區': '733', '六甲區': '734', '下營區': '735',
          '柳營區': '736', '鹽水區': '737', '善化區': '741', '大內區': '742', '山上區': '743', '新市區': '744',
          '安定區': '745'
        },
        '高雄市': {
          '新興區': '800', '前金區': '801', '苓雅區': '802', '鹽埕區': '803', '鼓山區': '804', '旗津區': '805',
          '前鎮區': '806', '三民區': '807', '楠梓區': '811', '小港區': '812', '左營區': '813',
          '仁武區': '814', '大社區': '815', '東沙群島': '817', '南沙群島': '819', '岡山區': '820', '路竹區': '821',
          '阿蓮區': '822', '田寮區': '823',
          '燕巢區': '824', '橋頭區': '825', '梓官區': '826', '彌陀區': '827', '永安區': '828', '湖內區': '829',
          '鳳山區': '830', '大寮區': '831', '林園區': '832', '鳥松區': '833', '大樹區': '840', '旗山區': '842',
          '美濃區': '843', '六龜區': '844', '內門區': '845', '杉林區': '846', '甲仙區': '847', '桃源區': '848',
          '那瑪夏區': '849', '茂林區': '851', '茄萣區': '852'
        },
        '屏東縣': {
          '屏東市': '900', '三地門鄉': '901', '霧臺鄉': '902', '瑪家鄉': '903', '九如鄉': '904', '里港鄉': '905',
          '高樹鄉': '906', '鹽埔鄉': '907', '長治鄉': '908', '麟洛鄉': '909', '竹田鄉': '911', '內埔鄉': '912',
          '萬丹鄉': '913', '潮州鎮': '920', '泰武鄉': '921', '來義鄉': '922', '萬巒鄉': '923', '崁頂鄉': '924',
          '新埤鄉': '925', '南州鄉': '926', '林邊鄉': '927', '東港鎮': '928', '琉球鄉': '929', '佳冬鄉': '931',
          '新園鄉': '932', '枋寮鄉': '940', '枋山鄉': '941', '春日鄉': '942', '獅子鄉': '943', '車城鄉': '944',
          '牡丹鄉': '945', '恆春鎮': '946', '滿州鄉': '947'
        },
        '台東縣': {
          '臺東市': '950', '綠島鄉': '951', '蘭嶼鄉': '952', '延平鄉': '953', '卑南鄉': '954', '鹿野鄉': '955',
          '關山鎮': '956', '海端鄉': '957', '池上鄉': '958', '東河鄉': '959', '成功鎮': '961', '長濱鄉': '962',
          '太麻里鄉': '963', '金峰鄉': '964', '大武鄉': '965', '達仁鄉': '966'
        },
        '花蓮縣': {
          '花蓮市': '970', '新城鄉': '971', '秀林鄉': '972', '吉安鄉': '973', '壽豐鄉': '974', '鳳林鎮': '975',
          '光復鄉': '976', '豐濱鄉': '977', '瑞穗鄉': '978', '萬榮鄉': '979', '玉里鎮': '981', '卓溪鄉': '982',
          '富里鄉': '983'
        },
        '金門縣': {'金沙鎮': '890', '金湖鎮': '891', '金寧鄉': '892', '金城鎮': '893', '烈嶼鄉': '894', '烏坵鄉': '896'},
        '連江縣': {'南竿鄉': '209', '北竿鄉': '210', '莒光鄉': '211', '東引鄉': '212'},
        '澎湖縣': {'馬公市': '880', '西嶼鄉': '881', '望安鄉': '882', '七美鄉': '883', '白沙鄉': '884', '湖西鄉': '885'}
    };
    /**
     * twzipcode Constructor
     * @param {Object} container HTML element
     * @param {(Object|string)} options User settings
     * @constructor
     */
    function TWzipcode (container, options) {
        /**
         * Default settings
         * @type {Object}
         */
        var defaults = {
            'countyName': 'county',
            'css': [],
            'detect': false,             // v1.6.7
            'districtName': 'district',
            'onCountySelect': null,      // v1.5
            'onDistrictSelect': null,    // v1.5
            'onZipcodeKeyUp': null,      // v1.5
            'readonly': false,
            'zipcodeName': 'zipcode',
            'zipcodePlaceholder': '郵遞區號',
            'zipcodeIntoDistrict': false, // v1.6.6
            'googleMapsKey': '' // v1.6.9
        };
        /**
         * DOM of selector
         * @type {Object}
         */
        this.container = $(container);
        /**
         * Merge the options
         * @type {Object}
         */
        this.options = $.extend({}, defaults, options);
        // initialize
        this.init();
    }
    /**
     * TWzipcode prototype
     */
    TWzipcode.prototype = {

        VERSION: '1.7.8',

        /**
         * Method: Get all post data
         * @return {Object}
         */
        data: function () {
            var wrap = this.wrap;
            return 'undefined' !== typeof data[wrap.county.val()] ?
                   data[wrap.county.val()] :
                   data;
        },
        /**
         * Method: Serialize the data
         * @return {string}
         */
        serialize: function () {
            var result = [],
                obj = {},
                ele = {},
                s = {};
            obj = this.container.find('select,input');
            if (obj.length) {
                obj.each(function () {
                    ele = $(this);
                    result.push(ele.attr('name') + '=' + ele.val());
                });
            } else {
                $(this).children().each(function () {
                    s = $(this);
                    result.push(s.attr('name') + '=' + s.val());
                });
            }
            return result.join('&');
        },
        /**
         * Method: Destroy the container.
         * @this {TWzipcode}
         */
        destroy: function () {
            $.data(this.container.get(0), 'twzipcode', null);
            if (this.container.length) {
                return this.container.empty().off('change.twzipcode keyup.twzipcode blur.twzipcode');
            }
        },
        /**
         * Method: Get elements of instance
         * @param {(string|Array)} opts Type name
         * @param {Function} callback Function callback
         */
        get: function (callback) {
            if ('function' === typeof callback) {
                callback.call(this, this.wrap);
            } else {
                return this.wrap;
            }
        },
        /**
         * Method: Set value for elements.
         * @param {(string|number|Object)} opts Input value
         */
        set: function (opts) {

            var self = this,
                def = {
                    'county': '',
                    'district': '',
                    'zipcode': ''
                },
                opt = $.extend({}, def, opts);

            try {
                if ('string' === typeof opts || 'number' === typeof opts) {
                    self.wrap.zipcode.val(opts).trigger('blur.twzipcode');
                } else {
                    if (opt.zipcode) {
                        self.wrap.zipcode.val(opt.zipcode).trigger('blur.twzipcode');
                    }
                    if (opt.county) {
                        self.wrap.county.val(opt.county).trigger('change.twzipcode');
                    }
                    if (opt.district) {
                        self.wrap.district.val(opt.district).trigger('change.twzipcode');
                    }
                }
            } catch (ignore) {
                console.warn(ignore.message);
            } finally {
                return self.container;
            }
        },
        /**
         * Method: Reset the selected items to default.
         * @this {TWzipcode}
         */
        reset: function (container, obj) {
            var self = this,
                wrap = self.wrap,
                county = '',
                list = {
                    'county': '<option value="">縣市</option>',
                    'district': '<option value="">鄉鎮市區</option>'
                },
                tpl = [];

            switch (obj) {
            case 'district':
                wrap.district.html(list.district);
                break;
            default:
                wrap.county.html(list.county);
                wrap.district.html(list.district);
                for (county in data) {
                    if ('undefined' !== typeof data[county]) {
                        tpl.push('<option value="' + county + '">' + county + '</option>');
                    }
                }
                $(tpl.join('')).appendTo(wrap.county);
                break;
            }
            wrap.zipcode.val('');
        },
        /**
         * Binding the event of the elements
         * @this {TWzipcode}
         */
        bindings: function () {

            var self = this,
                opts = self.options,
                wrap = self.wrap,
                dz   = '',
                dc   = '',
                dd   = '';

            // county
            wrap.county.on('change.twzipcode', function () {
                var val = $(this).val(),
                    district = '',
                    tpl = [];

                wrap.district.empty();

                if (val) {
                    if (true === opts.zipcodeIntoDistrict) {
                        for (district in data[val]) {
                            if ('undefined' !== typeof data[val][district]) {
                                tpl.push('<option value="' + district + '">');
                                tpl.push(data[val][district] + ' ' + district);
                                tpl.push('</option>');
                            }
                        }
                    } else {
                        for (district in data[val]) {
                            if ('undefined' !== typeof data[val][district]) {
                                tpl.push('<option value="' + district + '">');
                                tpl.push(district);
                                tpl.push('</option>');
                            }
                        }
                    }
                    wrap.district.append(tpl.join('')).trigger('change.twzipcode');
                } else {
                    wrap.county.find('option:first').prop('selected', true);
                    self.reset('district');
                }
                // County callback binding
                if ('function' === typeof opts.onCountySelect) {
                    opts.onCountySelect.call(this);
                }
            });
            // District
            wrap.district.on('change.twzipcode', function () {
                var val = $(this).val();
                if (wrap.county.val()) {
                    wrap.zipcode.val(data[wrap.county.val()][val]);
                }
                // District callback binding
                if ('function' === typeof opts.onDistrictSelect) {
                    opts.onDistrictSelect.call(this);
                }
            });
            // Zipcode
            wrap.zipcode.on('keyup.twzipcode blur.twzipcode', function () {
                
                var obj = $(this),
                    val = '',
                    i   = '',
                    j   = '';
                obj.val(obj.val().replace(/[^0-9]/g, ''));
                val = obj.val().toString();

                if (3 === val.length) {
                    for (i in data) {
                        if ('undefined' !== typeof data[i]) {
                            for (j in data[i]) {
                                if ('undefined' !== typeof data[i][j] &&
                                    val === data[i][j]
                                ) {
                                    wrap.county.val(i).trigger('change.twzipcode');
                                    wrap.district.val(j).trigger('change.twzipcode');
                                    break;
                                }
                            }
                        }
                    }
                }
                // Zipcode callback binding
                if ('function' === typeof opts.onZipcodeKeyUp) {
                    opts.onZipcodeKeyUp.call(this);
                }
            });

            dz = 'undefined' !== typeof opts.zipcodeSel ?
                 opts.zipcodeSel :
                 (
                    'undefined' !== typeof self.role.zipcode.data('value') ?
                    self.role.zipcode.data('value') :
                    opts.zipcodeSel
                 );

            dc = 'undefined' !== typeof opts.countySel ?
                 opts.countySel :
                 (
                    'undefined' !== typeof self.role.county.data('value') ?
                    self.role.county.data('value') :
                    opts.countySel
                 );

            dd = 'undefined' !== typeof opts.districtSel ?
                 opts.districtSel :
                 (
                    'undefined' !== typeof self.role.district.data('value') ?
                    self.role.district.data('value') :
                    opts.districtSel
                 );

            // Default value
            if (dc) {
                self.wrap.county.val(dc).trigger('change.twzipcode');
                if ('undefined' !== typeof data[dc][dd]) {
                    self.wrap.district.val(dd).trigger('change.twzipcode');
                }
            }
            if (dz && 3 === dz.toString().length) {
                self.wrap.zipcode.val(dz).trigger('blur.twzipcode');
            }
        },
        /**
         * Geolocation detect
         * @this {TWzipcode}
         */
        geoLocation: function () {
            
			var self = this,
                geolocation = navigator.geolocation,
                options = {
                    'maximumAge': 600000,
                    'timeout': 3000,
                    'enableHighAccuracy': false
                },
                opts = self.options;

            if (!geolocation) {
                return;
            }

            geolocation.getCurrentPosition(
                function (loc) {
                    
                    var latlng = {};
                    if (('coords' in loc) &&
                        ('latitude' in loc.coords) &&
                        ('longitude' in loc.coords)
                    ) {
                        latlng = [loc.coords.latitude, loc.coords.longitude];
                        $.getJSON(
                            'https://maps.googleapis.com/maps/api/geocode/json',
                            {
                                'key': opts.googleMapsKey,
                                'sensor': false,
                                'latlng': latlng.join(',')
                            },
                            function (data) {
                                var postal = '';
                                if (data &&
                                    'undefined' !== typeof data.results &&
                                    'undefined' !== typeof data.results[0].address_components &&
                                    'undefined' !== typeof data.results[0].address_components[0]
                                ) {
                                    postal = data.results[0]
                                                 .address_components[data.results[0].address_components.length - 1]
                                                 .long_name;
                                    if (postal) {
                                        self.wrap.zipcode.val(postal.toString()).trigger('blur.twzipcode');
                                    }
                                }
                            });
                    }
                },
                function (error) {
                    console.error(error);
                },
                options
            );
        },
        /**
         * twzipcode Initialize
         * @this {TWzipcode}
         */
        init: function () {

            var self = this,
                container = self.container,
                opts = self.options,
                role = {
                    county: container.find('[data-role=county]:first'),
                    district: container.find('[data-role=district]:first'),
                    zipcode: container.find('[data-role=zipcode]:first')
                },
                countyName = role.county.data('name') || opts.countyName,
                districtName = role.district.data('name') || opts.districtName,
                zipcodeName = role.zipcode.data('name') || opts.zipcodeName,
                zipcodePlaceholder = role.zipcode.data('placeholder') || opts.zipcodePlaceholder,
                readonly = role.zipcode.data('readonly') || opts.readonly;

            // Elements create
            $('<select/>')
                .attr('name', countyName)
                .addClass(role.county.data('style') || ('undefined' !== typeof opts.css[0] ? opts.css[0] : ''))
                .appendTo(role.county.length ? role.county : container);

            $('<select/>')
                .attr('name', districtName)
                .addClass(role.district.data('style') || ('undefined' !== typeof opts.css[1] ? opts.css[1] : ''))
                .appendTo(role.district.length ? role.district : container);

            $('<input/>')
                .attr({'type': 'text', 'name': zipcodeName, 'placeholder': zipcodePlaceholder})
                .prop('readonly', readonly)
                .addClass(role.zipcode.data('style') || ('undefined' !== typeof opts.css[2] ? opts.css[2] : ''))
                .appendTo(role.zipcode.length ? role.zipcode : container);

            self.wrap = {
                'county': container.find('select[name="' + countyName + '"]:first'),
                'district': container.find('select[name="' + districtName + '"]:first'),
                'zipcode': container.find('input[type=text][name="' + zipcodeName + '"]:first')
            };

            if (true === opts.zipcodeIntoDistrict) {
                self.wrap.zipcode.hide();
            }

            self.role = role;
            // Reset the elements
            self.reset();
            // Elements events binding
            self.bindings();
            // Geolocation
            if (true === opts.detect) {
                self.geoLocation();
            }
        }
    };
    /**
     * jQuery twzipcode instance
     * @param {Object} options Plugin settings
     * @public
     */
    $.fn.twzipcode = function (options) {
        var instance = {},
            result = [],
            args = arguments,
            id  = 'twzipcode';
        if ('string' === typeof options) {
            this.each(function () {
                instance = $.data(this, id);
                if (instance instanceof TWzipcode && 'function' === typeof instance[options]) {
                    result = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });
            return 'undefined' !== typeof result ? result : this;
        } else {
            return this.each(function () {
                if (!$.data(this, id)) {
                    $.data(this, id, new TWzipcode(this, options));
                }
            });
        }
    };

})(window.jQuery || {}, window, document);
//#EOF
