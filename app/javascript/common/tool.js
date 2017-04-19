import $ from 'jquery';
import _ from 'lodash';
import 'jquery-ui/ui/widgets/sortable';
import Materialize from 'materialize-css';

export const scrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

// for clickAtOrigin detect
const waitListen = [];

$(document).on('click', e => {
  waitListen.forEach(x => {
    const dom = x[0].get(0);
    if (dom === undefined) return;
    if (!$.contains(dom, e.target)) x[1]();
  });
});

export const clickAtOrigin = ($wrapper, cb) => {
  waitListen.push([$wrapper, cb]);
};

// path can be single string or array
// eg: runPage('admin-guests-index', fn)
// or: runPage(['page-a', 'page-b'], video)
export const runPage = (path, fn) => {
  const pageID = $('body').attr('id');
  const map = {
    string: () => pageID === path,
    object: () => path.some(x => x === pageID)
  };
  const isAllow = map[typeof path]();

  if (isAllow) {
    fn();
  }
};

// file to base64
export const readImageFile = event => {
  event.preventDefault();
  let files;
  if (event.dataTransfer) {
    files = event.dataTransfer.files;
  } else if (event.target) {
    files = event.target.files;
  }

  return new Promise((resolve, reject) => {
    if (files.length <= 0) {
      reject('文件为空');
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        resolve(reader.result);
      };
    }
  });
};

// elementSelector is container of the sort item list
// itemSelector is sort item's class
// you need to define the getUrl function and getParam function
export const addSortUtil = config => {
  const default_config = {
    elementSelector: '#sortable',
    itemSelector: '.sitem',
    getParams: () => {},
    getUrl: () => {}
  };
  config = Object.assign({}, default_config, config);
  $(config.elementSelector).sortable({
    axis: 'xy',
    items: config.itemSelector,
    helper: (event, row) => {
      row.children().each(function () {
        // weird
        $(this).width($(this).width());
      });
      return row;
    },
    update: (event, ui) => {
      const position = ui.item.index();
      $.ajax({
        method: 'PATCH',
        data: config.getParams(ui.item, position),
        url: config.getUrl($(event.target), ui.item),
        dataType: 'json'
      }).fail(() => {
        // alert erro need reload
      });
    }
  });
};

// showMessage(message: 'this is a message', type: 'error', duration: 4000);
// message is what you want to send, type control the background color, error is red, success is blue.
// duration control the showing time.
export const showMessage = config => {
  const default_config = {
    message: '',
    type: 'success',
    duration: 3000
  };
  config = Object.assign({}, default_config, config);
  const message = config.message;
  const type = config.type;
  const duration = config.duration;
  Materialize.toast(message, duration, `toast-message ${type}`);
};

// need a serch_util as container, need a search_input as input field , need a result dom to display search result.
export const searchUtil = config => {
  const default_config = {
    elementSelector: '#search_util',
    inputSelector: '#search_input',
    resultSelector: '#search_result',
    search_url: '',
    getSelectedUrl: () => {},
    afterSelectItem: () => {}
  };

  config = Object.assign({}, default_config, config);

  const emptySearchResult = () => {
    $(config.resultSelector).empty();
  };

  clickAtOrigin($(config.elementSelector), emptySearchResult);

  $(config.inputSelector).on('input focus', function () {
    const text = $(this).val();
    if (text === '') {
      emptySearchResult();
      return;
    }
    $.ajax({
      data: { 'q[name_cont]': text },
      url: config.search_url,
      dataType: 'json'
    }).done(data => {
      renderSearchResult(data);
    }).fail(() => {
      // refresh and retry
    });
  });

  // render search result
  const renderSearchResult = elements => {
    const temp = _.template(
      '<div id=\'search_result\'>' +
        '<div class=\'collection\'>' +
          '<% _.forEach(result, function(ele){ %>' +
            '<a class=\'collection-item\' data-id=\'<%-ele.id%>\'>' +
              '<img class=\'circle\' src=\'<%-ele.default_avatar.file.url%>\'>' +
              '<span><%-ele.name%></span>' +
            '</a>' +
          '<% }) %>' +
        '</div>' +
      '</div>'
    );
    const html = temp({ result: elements });
    $(config.resultSelector).replaceWith(html);
  };

  // select one element
  $(config.elementSelector).on('click', `${config.resultSelector} a`, e => {
    const select_item_id = $(e.target).data('id');
    $.ajax({
      method: 'POST',
      data: { id: select_item_id },
      url: config.getSelectedUrl(),
      dataType: 'json'
    }).done(data => {
      config.afterSelectItem(data);
    }).fail(xhr => {
      if (xhr.status === 422) {
        alert(xhr.responseJSON.message);
      } else {
        console.log('need refresh and try again');
      }
    });
  });
};
