const path = require("path");
// console.log(path);

/**
 * ? 1. 디렉토리를 사용 하기 위헤 commonJS 방식으로 "경로(PATH)"를 제어하는 모듈을 import 했다.
 * moduleJS === mJS === ESM(ECMAScript Module)도 동일하게 package.json에 설정하면 사용할 수 있다.
 */

// ? 2. 함수선언인 setConfig()는 맨 아래의 코드를 확인 한 뒤에 돌아 볼 것

function setConfig(mode = "development", pathAndfilename, fileformat) {
  if (
    typeof mode === "string" &&
    typeof pathAndfilename === "string" &&
    typeof fileformat === "string"
  ) {
    // ? 4. if(조건식)
    /**
     * 함수 호출 과정에서 원하지 않는 데이터 타입이 입력되어 오동작이 일어나지 않도록
     * 조건을 처리했다. (모든 파일은 문자열로 처리된다는 조건을)
     *
     * */

    function setUpFileFormat(fileformat) {
      switch (fileformat) {
        case "javascript":
          return "js";
          break;
        case "typescript":
          return "ts";
          break;
        case "js":
          return "js";
          break;
        case "ts":
          return "ts";
          break;
        default:
          return console.log("need string check fileformat");
      }
    }
    /*
      ?5. 매개변수 fileformat 데이터를 원하는 형태로 "가공"하는 형태를 만들기 위해 
      * 내부함수 격인 함수를 생성했다. 변수의 경우라면 지역변수에 해당하며, closure라고 부른다. (정확한 의미는 약간 다르다.)
     * 한번만 실행할 것이기 때문에 내부함수로 제작했다. 
     * 원하는 경우의 수를 고려하여 if문이 아닌 switch문으로 처리했다. if(), else if()로도 처리 할 수 있다. 
     * 형태는 안티패턴이긴 하지만, switch의 가독성과 처리 방식을 점쳐볼 것       
    */
    
    const setFileformat = setUpfileFormat(fileformat);
    // ?6. 위 내부 함수를 한번 호출 하여, 리턴값을 받는 상수를 마련했다.

    // * 결과적으로 setFileformat 변수는 간단한 문자열인 셈이 된다. 
    // * 내부 함수를 사용하는 등 복잡한 과정이 존재하지만, 덕분에 리터럴을 제거하고 잘못된 실행을 원천적으로 막아내는 효과가 발행한다.
    
    const setWebpackObject = {
      mode: mode,
      entry: `./src/${pathAndfilename}.${setFileformat}`,
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: `${pathAndfilename}.bundle.${setFileformat}`,
      },
    }
    /**
     * ?7. 마치 정수기 필터가 작동하듯이, 
     * 일반적으로 리터럴로 작성하는 파일을 이상하게 꼬아놓은 것이므로 '목적'과는 완전히 정 반대의 코드임을 확인
     * config 파일을 이렇게 처리하진 않는 점(한번 정의 한 것은 특별한 경우가 아니라면 좀처럼 바꾸지 않는다. )
     * 자바스크립트 언어 측면에서는 '객체'를 원하는 형태로 만들어내는 '함수'를 만들어 자동화 했다는 점이 처리포인트이다.  
     */
    console.log("complete!");
    return setWebpackObject;    
  } else {
    return console.error("need parameter to be string");
  }
}
// ? 3. cJS 방식으로 함수를 대입한 것을 알 수 있다.
/**
 * webpack.config.js <-- 파일 조건상 객체 데이터타입을 export 해야만 하는데
 * setConfig() 함수는 리턴타입이 "객체"라는 뜻이 된다. 
 * 다시말해 webpack.config,js 혹은 webpack이 '필요한 조건'은 무엇인지 확인하고 대응 하는 것과 
 * 함수가 객체를 리턴하는 것을 구분할 필요가 있다. 
 */

module.exports = setConfig("development", "test", "js");
/**
 * ?8 결과적으로 module.exports 명령
 * 모듈화시킨 '객체'는 상당히 자주사용 하는 코드 디자인 패턴이기 때문에 웹팩을 설정하는 주요 key를 적응하면서, 
 * 객체를 리턴하고, 함수를 호출하고, 필요한 만듴 데이터를 가공하는 일련의 작업을 처리하는 훈련이 필요하다. 
 */

