const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;             // 定义 formControl变量 赋值于 参数input的parentElement属性返回指定元素的父元素；  ？？？
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');    //定义small变量 赋值于 formControl变量的querySelector方法仅仅返回匹配指定选择器的第一个元素——从而获取到small标签 ？？？  querySelector方法获取到标签？
  small.innerText = message;                           // 获取small变量内容不解析 赋值于 message，这样输入错误就会执行显示输错提示   ？？？  message是实参？message是css样式红色？
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;             // 定义formControl变量 赋值于 参数input的parentElement属性返回指定元素的父元素；  ？？？
  formControl.className = 'form-control success';      // formControl变量的类名是 form-control success， 但是css样式却不是form-control success；  ？？？
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');            //执行名为展示错误的函数, 参数是input , 'Email is not valid'就是message ？？？ 所以把Email is not valid传入small标签，怎么传，原理？
  }
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  if(!checkRequired([username, email, password, password2])){
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
  }

});
