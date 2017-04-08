# coding: utf-8
class HomeController < ApplicationController
  def index
    @topic = {
      id: 123123,
      title: '2017 IJCAI 计算机与思想奖迎来女性获奖者 Devi Parikh',
      tags: [
        { id: 123, title: '人工智能' }
      ],
      author: '人工智能',
      cover: 'http://jiqizhixin.com/data/upload/20170405/58e4c2dc45410.jpeg',
      summary: '国际人工智能联合会议（International Joint Conference onArtificial Intelligence，IJCAI）是聚集人工智能领域研究者和从业者的盛会...'
    }
  end
end
