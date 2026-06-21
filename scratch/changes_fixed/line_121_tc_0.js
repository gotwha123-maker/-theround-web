        if (cropW > 0 && cropH > 0) {
          const region = image.clone().crop({ x, y, w: cropW, h: cropH });
          
          // 얼굴 흐림(블러) 필터 적용 (누군지 특정할 수 없을 정도의 블러 반경 설정)
          region.blur(18); 
          
          image.composite(region, x, y);
        }