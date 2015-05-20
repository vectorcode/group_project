(function($){

	var SaveScreen = (function(){

			// Подключаем прослушку событий
			function _setUpListners(){
				$('.save-button').on('click', _saveData);

			}

			function _saveData(e) {
				e.preventDefault();

				//инициализация плагина
				$('.save-img').html2canvas();

				var	url = 'php/action-save.php',
				    canvas = $('canvas')[0],
	                data = canvas.toDataURL('image/png').replace(/data:image\/png;base64,/, ''),
	                defObject = _ajaxForm(data, url);


	            $('canvas').remove();

	            defObject.done(function(ans){
	               	console.log('Изображение '+ans+' сохранено');
	            })
	        }

			// Универсальная функция ajax
			function _ajaxForm(data, url){

				var defObj = $.ajax({
						type : "POST",
						url : url,
						data: data
					}).fail(function(){
						console.log('Проблемы на стороне сервера');
					})

				return defObj;
			}

		// Возвращаем в глобальную область видимости
			return {
				init: function () {
					_setUpListners();
				}
			}

	}());


	$(document).ready(function(){

		SaveScreen.init();

	})

})(jQuery);


//Модуль загрузки изображений
var UplFileModul = (function($) {
    'use strict';
    var init = function(bgInp, wtkInp, blBg, blWtk){//инициализация плагина
        _c("Инициализировали модуль formValModul");

        var $_bgInp = $(bgInp),
            $_wtkInp = $(wtkInp),
            $_blBg = $(blBg),
            $_blWtk = $(blWtk);

        if($_bgInp.length === 0 || $_wtkInp.length === 0 || $_blBg.length === 0 || $_blWtk.length === 0){
            console.error('Ошибка инициализации плагина UplFileModul - переданные блоки не существуют!');
        }


        _addUplPlgn({
            'bg' : {
                'name': 'background',
                'inp' : $_bgInp,
                'blk' : $_blBg
            },
            'wtk' :{
                'name': 'watermark',
                'inp' : $_wtkInp,
                'blk' : $_blWtk
            }
        });
    },
    _c = function(mas){//console.log
        var flag = true;
        if (flag) {console.log(mas);};
    },
    _createObj = function(){
            this.name = '';
            this.url = '';
            this.deleteType = '';
            this.deleteUrl = '';
            this.size = '';
            this.thumbnailUrl = '';
            this.type = '';
            this.width = '';
            this.height = '';
            this.posX = '';
            this.posY = '';

    },
    _newImg = {//Объект с полной информациях о загруженных изображениях
        'background' : new _createObj(),
        'watermark' : new _createObj()
    },
    _addUplPlgn = function(obj){//инициализируем плагин  jQuery-File-Upload https://github.com/blueimp/jQuery-File-Upload

      for (var key in obj) {
          _c('//Устанавливаем file-upl на элементы объекта - '+key);

        (function(key){
            obj[key].inp.fileupload({
                dataType: 'json',
                done: function (e, data) {
                    $.each(data.result.files, function (index, file) {
                        obj[key].blk.html('<img src="../app/php/files/'+file.name+'" alt="">');
                        _c(obj[key].name);

                        for (var prop in file) {
                            _newImg[obj[key].name][prop] = file[prop];
                        };
                        _c(_newImg);//отображаем данные загруженного изображения
                    });
                }
            });

        })(key)

      };

    };

    return {init : init};
})(jQuery);


//Модуль изменения положения watermark
var WaterMarkDragAndDrop = (function(){
    var watermark = $('#blWtk'),
        watermarkParent = watermark.parent(),
        init = function(){
            _setUpListeners();
        },
        _setUpListeners = function(){
            _positionChangedEventHandler();
            _dragEventHandler();
        },
        _dragEventHandler = function(){
            watermark.draggable();
        },
        _positionChangedEventHandler = function(){
            $('#positions')
                .find('.nav-item')
                .on('click', _positionChanged);
        },
        _positionChanged = function(e){
            var $this = $(this);
                positions = $this.data('target-position').split(',');

            $('.nav-item').each(function( index ) {
                $( this).removeClass('current');
            });

            $this.addClass('current');
            _positioning(positions[0], positions[1], watermarkParent);
        },
        _positioning = function(horizontalAlign, verticalAlign, parent){


            watermark.position({
                my: horizontalAlign + " " + verticalAlign,
                at: horizontalAlign + " " + verticalAlign,
                of: parent
            });
        }
    return {
        Init: init
    }
})();