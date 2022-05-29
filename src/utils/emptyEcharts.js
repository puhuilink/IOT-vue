import dummyStatus_url from '@/icons/echarts/dummyStatus.png'
export const setNotopt = (demo, subtext = '最近七天无数据') => {
  var option = {
    title: {
      text: ' {a|}',
      x: 'center',
      y: 'center',
      subtext,
      itemGap: -20,
      textStyle: {
        rich: {
          a: {
            color: '#000',
            fontSize: '16',
            height: 100,
            width: 200,
            backgroundColor: {
              image: dummyStatus_url
            }
          }
        }
      },
      subtextStyle: {
        fontSize: 16
      }
    }
  }
  demo.setOption(option, true)
}
