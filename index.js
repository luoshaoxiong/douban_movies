/**
 * Created by Administrator on 2018/5/4.
 */

(function init() {
    top250().initTop250();
    beimei().initBeimei();
    search().initSearch();

    $('footer div').on('click', function() {
        $(this).addClass('active')
            .siblings()
            .removeClass('active');
        $('section').eq($(this).index())
            .addClass('show')
            .siblings()
            .removeClass('show');
    })
})();

function top250() {
    var page = 0,
        count = 20,
        hasMore = true;
    function initTop250() {
        getData();
        bind();
    }
    function bind() {
        // 滚动到底则再次加载
        $('section').has('.top250-container').scroll(throttle(function() {
            var $this = $(this);
            if($this[0].scrollTop + $this.height() - 11 >= $this.find('.loading')[0].offsetTop) {
                if(hasMore) {
                    page++;
                    getData();
                } else {
                    $this.find('.loading').addClass('hide')
                        .next('.no-more').removeClass('hide');
                }
            }
        }, 600))
    }
    function getData() {
        var data = {start: page*20, count: 20};
        $.ajax({
            url: 'https://api.douban.com/v2/movie/top250',
            data: data,
            type: 'GET',
            dataType: 'jsonp'
        }).done(function(res) {
            hasMore = res.total>(page+1)*count ? true : false;
            var data = res.subjects;
            setData(data);
        })
    }
    function setData(data) {
        $parent = $('.top250-container');
        for (var i=0;i<data.length;i++) {
            $node = $('\n' +
                '                <div class="movie clearfix">\n' +
                '                    <div  class="movie-preview"><img src="image/movie1.png"/></div>\n' +
                '                    <div class="movie-introduce">\n' +
                '                        <dt class="movie-title">肖申克的救赎</dt>\n' +
                '                        <dl class="movie-detail"><span class="score">9.6</span>分 / <span class="collection">199999</span>收藏</dl>\n' +
                '                        <dl class="movie-detail"><span class="year">1994</span> / <span class="type">犯罪</span></dl>\n' +
                '                        <dl class="movie-detail">导演：<span class="director">shaoxiong</span></dl>\n' +
                '                        <dl class="movie-detail">主演：<span class="actor">少雄</span></dl>\n' +
                '                    </div>\n' +
                '                </div>');
            $node.find('img').attr('src', data[i].images.small);
            $node.find('.movie-title').text(data[i].title);
            $node.find('.score').text(data[i].rating.average);
            $node.find('.collection').text(data[i].rating.stars);
            $node.find('.year').text(data[i].year);
            $node.find('.type').text(function() {
                var text = '';
                for (var j=0;j<data[i].genres.length;j++) {
                    text += text===''? data[i].genres[j] : ' / ' + data[i].genres[j];
                }
                return text;
            });
            $node.find('.director').text(function() {
                var text = '';
                for (var j=0;j<data[i].directors.length;j++) {
                    text += text===''? data[i].directors[j].name : ' / ' + data[i].directors[j].name;
                }
                return text;
            });
            $node.find('.actor').text(function() {
                var text = '';
                for (var j=0;j<data[i].casts.length;j++) {
                    text += text===''? data[i].casts[j].name : ' / ' + data[i].casts[j].name;
                }
                return text;
            });
            $parent.append($node);
        }

    }
    return {
        initTop250: initTop250,
        bind: bind,
        getData: getData,
        setData: setData
    }
}
function beimei() {
    function initBeimei() {
        getData();
    }
    function getData() {
        $.ajax({
            url: 'https://api.douban.com/v2/movie/us_box',
            type: 'GET',
            dataType: 'jsonp'
        }).done(function(res) {
            console.log(res);
            var data = res.subjects;
            setData(data);
        })
    }
    function setData(data) {
        $parent = $('.beimei-container');
        for (var i=0;i<data.length;i++) {
            $node = $('\n' +
                '                <div class="movie clearfix">\n' +
                '                    <div  class="movie-preview"><img src="image/movie1.png"/></div>\n' +
                '                    <div class="movie-introduce">\n' +
                '                        <dt class="movie-title">肖申克的救赎</dt>\n' +
                '                        <dl class="movie-detail"><span class="score">9.6</span>分 / <span class="collection">199999</span>收藏</dl>\n' +
                '                        <dl class="movie-detail"><span class="year">1994</span> / <span class="type">犯罪</span></dl>\n' +
                '                        <dl class="movie-detail">导演：<span class="director">shaoxiong</span></dl>\n' +
                '                        <dl class="movie-detail">主演：<span class="actor">少雄</span></dl>\n' +
                '                    </div>\n' +
                '                </div>');
            $node.find('img').attr('src', data[i].subject.images.small);
            $node.find('.movie-title').text(data[i].subject.title);
            $node.find('.score').text(data[i].subject.rating.average);
            $node.find('.collection').text(data[i].subject.rating.stars);
            $node.find('.year').text(data[i].subject.year);
            $node.find('.type').text(function() {
                var text = '';
                for (var j=0;j<data[i].subject.genres.length;j++) {
                    text += text===''? data[i].subject.genres[j] : ' / ' + data[i].subject.genres[j];
                }
                return text;
            });
            $node.find('.director').text(function() {
                var text = '';
                for (var j=0;j<data[i].subject.directors.length;j++) {
                    text += text===''? data[i].subject.directors[j].name : ' / ' + data[i].subject.directors[j].name;
                }
                return text;
            });
            $node.find('.actor').text(function() {
                var text = '';
                for (var j=0;j<data[i].subject.casts.length;j++) {
                    text += text===''? data[i].subject.casts[j].name : ' / ' + data[i].subject.casts[j].name;
                }
                return text;
            });
            $parent.append($node);
        }
    }
    return {
        initBeimei: initBeimei,
        getData: getData,
        setData: setData
    }
}
function search() {
    var page = 0,
        count = 20,
        hasMore = true;
    function initSearch() {
        getData();
        bind();
    }
    function bind() {
        // 滚动到底则再次加载
        $('section').has('.search-input').scroll(throttle(function() {
            var $this = $(this);
            if($this[0].scrollTop + $this.height() - 11 >= $this.find('.loading')[0].offsetTop) {
                if(hasMore) {
                    page++;
                    getData();
                } else {
                    $('#search .loading').addClass('hide').next('.no-more').removeClass('hide');
                }
            }
        }, 600));
        $('.search-btn').click(function() {
            $('#search .no-more').addClass('hide')
                .prev('.loading').removeClass('hide');
            page = 0;
            $('.search-container').empty();
            getData();
        });
    }
    function getData() {
        var data = {start: page*count, count: count, q: $('.search-input').val(), tag: ''};
        $.ajax({
            url: 'https://api.douban.com/v2/movie/search',
            data: data,
            type: 'GET',
            dataType: 'jsonp'
        }).done(function(res) {
            console.log(data);
            hasMore = res.total>(page+1)*count ? true : false;
            if (res.total===0) {
                $('#search .no-more').removeClass('hide')
                    .prev('.loading').addClass('hide');
            } else {
                var data = res.subjects;
                setData(data);
            }
        })
    }
    function setData(data) {
        $parent = $('.search-container');
        for (var i=0;i<data.length;i++) {
            $node = $('\n' +
                '                <div class="movie clearfix">\n' +
                '                    <div  class="movie-preview"><img src="image/movie1.png"/></div>\n' +
                '                    <div class="movie-introduce">\n' +
                '                        <dt class="movie-title">肖申克的救赎</dt>\n' +
                '                        <dl class="movie-detail"><span class="score">9.6</span>分 / <span class="collection">199999</span>收藏</dl>\n' +
                '                        <dl class="movie-detail"><span class="year">1994</span> / <span class="type">犯罪</span></dl>\n' +
                '                        <dl class="movie-detail">导演：<span class="director">shaoxiong</span></dl>\n' +
                '                        <dl class="movie-detail">主演：<span class="actor">少雄</span></dl>\n' +
                '                    </div>\n' +
                '                </div>');
            $node.find('img').attr('src', data[i].images.small);
            $node.find('.movie-title').text(data[i].title);
            $node.find('.score').text(data[i].rating.average);
            $node.find('.collection').text(data[i].rating.stars);
            $node.find('.year').text(data[i].year);
            $node.find('.type').text(function() {
                var text = '';
                for (var j=0;j<data[i].genres.length;j++) {
                    text += text===''? data[i].genres[j] : ' / ' + data[i].genres[j];
                }
                return text;
            });
            $node.find('.director').text(function() {
                var text = '';
                for (var j=0;j<data[i].directors.length;j++) {
                    text += text===''? data[i].directors[j].name : ' / ' + data[i].directors[j].name;
                }
                return text;
            });
            $node.find('.actor').text(function() {
                var text = '';
                for (var j=0;j<data[i].casts.length;j++) {
                    text += text===''? data[i].casts[j].name : ' / ' + data[i].casts[j].name;
                }
                return text;
            });
            $parent.append($node);
        }

    }
    return {
        initSearch: initSearch,
        bind: bind,
        getData: getData,
        setData: setData
    }
}

function throttle(fn, delay) {
    var handleOver = true;
    return function() {
        if(handleOver===false) {return}
        handleOver = false;
        var that = this;
        setTimeout(function() {
            fn.apply(that, arguments);
            handleOver = true;
        }, delay);
    }
}