import $ from 'jquery';
import _ from 'lodash';
import Vue from 'vue/dist/vue.js';
import 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import load_search_component from '../common/search_component';

import { addSortUtil, searchUtil } from '../common/tool';

const event = () => {
  const event_id = $('.wrapper-content').data('event-id');
  $('.selector').flatpickr({
    enableTime: true
  });

  searchUtil({
    search_url: '/admin/guests',
    getSelectedUrl: () => { return `/admin/events/${event_id}/guests`; },
    afterSelectItem: data => { $('.js_display').prepend(renderDisplayRow(data)); }
  });

  addSortUtil({
    getParams: (item, item_position) => {
      return { events_guest: { rank_order_position: item_position } };
    },
    getUrl: (element, item) => {
      const guest_id = item.data('id');
      return `/admin/events/${event_id}/guests/${guest_id}`;
    }
  });

  const renderDisplayRow = element => {
    const html = $('.template').clone()
                               .removeClass('hide template')
                               .wrap('<p/>')
                               .parent()
                               .html();
    const temp = _.template(html);
    return temp({ ele: element });
  };

  // patch showing or not showing
  $('.js_display').on('click', 'input', function () {
    const $this = $(this);
    const current_tr = $this.closest('tr');
    const guest_id = current_tr.data('id');
    const showing = $this.prop('checked');
    $.ajax({
      method: 'PATCH',
      url: `/admin/events/${event_id}/guests/${guest_id}`,
      data: { events_guest: { show: showing } },
      dataType: 'json'
    }).fail(() => {
      alert('error need reload');
    });
  });

  // remove a guest form event
  $('.js_display').on('click', '.btn', function () {
    const current_tr = $(this).closest('tr');
    const guest_id = current_tr.data('id');
    current_tr.remove();
    $.ajax({
      method: 'DELETE',
      url: `/admin/events/${event_id}/guests/${guest_id}`,
      dataType: 'json'
    }).fail(() => {
      alert('error need reload');
    });
  });

  load_search_component();

  new Vue({
    el: '#vue-element',
    data: {
      partner_categories: [],
      partner_category: {}
    },
    created() {
      this.loadData();
    },
    mounted() {
      addSortUtil({
        elementSelector: '.partner_category_sort',
        itemSelector: '.partner_category_item',
        getParams: (item, item_position) => {
          return { partner_category: { rank_order_position: item_position } };
        },
        getUrl: (element, item) => {
          const index = item.data('index');
          const partner_category = this.partner_categories[index];
          return `/admin/events/${event_id}/partner_categories/${partner_category.id}`;
        }
      });
    },
    updated() {
      addSortUtil({
        elementSelector: '.js_partners_sort',
        itemSelector: '.partner_item',
        getParams: (item, item_position) => {
          return { partner_categories_partner: { rank_order_position: item_position } };
        },
        getUrl: (element, item) => {
          const partner_category_index = element.data('partner-category-index');
          const partner_categories_partners_index = item.data('partner-index');
          const partner_category = this.partner_categories[partner_category_index];
          const partner = partner_category.partner_categories_partners[partner_categories_partners_index].partner;
          return `/admin/events/${event_id}/partner_categories/${partner_category.id}/partners/${partner.id}`;
        }
      });
    },
    methods: {
      loadData() {
        const v_this = this;
        $.ajax({
          url: `/admin/events/${event_id}/partner_categories`,
          dataType: 'json'
        }).done(data => {
          v_this.partner_categories = data;
        });
      },
      updatePartnerCategory(category) {
        $.ajax({
          method: 'PATCH',
          url: `/admin/events/${event_id}/partner_categories/${category.id}`,
          data: { partner_category: { name: category.name } }
        }).fail(xhr => {
          if (xhr.status === 422) {
            alert(xhr.responseJSON.message);
          } else {
            console.log('need refresh and try again');
          }
        });
      },
      deletePartnerCategory(category, index) {
        const v_this = this;
        const result = confirm('Are you sure?');
        if (result) {
          $.ajax({
            method: 'DELETE',
            url: `/admin/events/${event_id}/partner_categories/${category.id}`
          }).done(() => {
            v_this.partner_categories.splice(index, 1);
          });
        }
      },
      createPartnerCategory() {
        const v_this = this;
        $.ajax({
          method: 'POST',
          data: { partner_category: { name: v_this.partner_category.name, rank_order_position: '0' } },
          url: `/admin/events/${event_id}/partner_categories`,
          dataType: 'json'
        }).done(data => {
          v_this.partner_categories.unshift(data);
        }).fail(xhr => {
          if (xhr.status === 422) {
            alert(xhr.responseJSON.message);
          } else {
            console.log('need refresh and try again');
          }
        });
      },
      loadPartnerCategoryPartners(category) {
        $.ajax({
          url: `/admin/events/${event_id}/partner_categories/${category.id}/partners`,
          dataType: 'json'
        }).done(data => {
          category.partner_categories_partners = data;
        });
      },
      deleteParnterCategoriesPartner(partner_category, partner_categories_partner, index) {
        const result = confirm('Are you sure?');
        if (result) {
          $.ajax({
            method: 'DELETE',
            url: `/admin/events/${event_id}/partner_categories/${partner_category.id}/partners/${partner_categories_partner.partner.id}`
          }).done(() => {
            partner_category.partner_categories_partners.splice(index, 1);
          });
        }
      },
      renderResultItem() {
        return '<span>{{item.name}}</span>';
      },
      whenClickResult(ele, item) {
        const v_this = this;
        const index = $($(ele)[0].closest('.collection')).data('index');
        const partner_category = this.partner_categories[index];
        const partner_id = item.id;
        $.ajax({
          method: 'POST',
          data: { id: partner_id },
          url: `/admin/events/${event_id}/partner_categories/${partner_category.id}/partners`,
          dataType: 'json'
        }).done(() => {
          v_this.loadPartnerCategoryPartners(partner_category);
        }).fail(xhr => {
          if (xhr.status === 422) {
            alert(xhr.responseJSON.message);
          } else {
            console.log('need refresh and try again');
          }
        });
      }
    }
  });
};

export default event;
