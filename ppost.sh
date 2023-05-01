#!/bin/bash

pwd=$PWD
title_flag=0
category_flag=0
tag_flag=0
valid_categories=("algorithm" "cs" "issue" "java" "python" "tech", "etc")

## 도움말 출력하는 함수
usage() {
  echo "    -t                타이틀"
  echo "    -c                카테고리 [ algorithm cs issue java python tech etc ]"
  echo "    -s                서브 카테고리"
  echo "    -a                태그"
  exit 0
}

if [ $# -eq 0 ];
then
  usage
  exit 0
fi

title=""
category=""
sub=""
tags=""
date=$(date '+%Y-%m-%d')
datetime=$(date '+%Y-%m-%d %H:%M:%S+0900')

while getopts "t:c:s:a:" opt
do
  case $opt in
    t) title=$OPTARG 
      title_flag=1
      ;;
    c) category=$OPTARG 
    for valid_category in "${valid_categories[@]}"; do
        if [ "$valid_category" == "$category" ]; then
          category_flag=1
          break
        fi
      done
      if [ $category_flag -eq 0 ]; then
        echo "Error: Invalid category. Must be one of: [${valid_categories[*]}]"
        echo "Error: Invalid category. Must be one of: [${valid_categories[*]}]"
        echo "Error: Invalid category. Must be one of: [${valid_categories[*]}]"
        exit 1
      fi
      ;;
    s) sub=$OPTARG ;;
    a) tag=$OPTARG
      tag_flag=1
      ;;
    h) usage ;;
    ?) usage ;;
  esac
done


if [ $title_flag -eq 0 ]; then
    echo "Error: -t options are required, 제목 쓰세요"
    echo "Error: -t options are required, 제목 쓰세요"
    echo "Error: -t options are required, 제목 쓰세요"
    exit 1
fi

if [ $tag_flag -eq 0 ]; then
    echo "Error: -a options are required, 태그 쓰세요"
    echo "Error: -a options are required, 태그 쓰세요"
    echo "Error: -a options are required, 태그 쓰세요"
    exit 1
fi



echo "---
layout: post
date: ${datetime}
title: ${title}
categories: ${category}
tag: [${tag}]
---

# ${title}


" > $pwd/_posts/$category/_posts/"$date-$title".md
