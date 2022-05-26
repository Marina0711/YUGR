export const Strings = {
    authScreen: {
        welcome: 'Добро пожаловать!',
        loginToProfile: 'Войдите в профиль',
        email: 'Электронная почта',
        password: 'Пароль',
        logIn: 'Войти',
        register: 'Зарегистрироваться',
        confirmPassword: 'Подтвердите пароль',
        alreadyHaveAccount: 'Уже есть аккаунт?',
        name: 'Имя',
        surname: 'Фамилия',
        phoneNumber: 'Номер телефона'
    },
    authValidation: {
        PSWDDoNotMatch: 'Пароли не совпадают',
        limitExceeded: 'Превышен лимит символов',
        required: 'Обязательное поле',
        incorrectEmail: 'Некорректная почта',
        passwordIsShort: 'Пароль слишком короткий',
        incorrectNumber: 'Некорректный номер'
    },
    homeScreen: {
        productList: 'Список товаров',
        noProducts: 'Товары отсутствуют',
        all: 'Все'
    },
    productScreen: {
        toRate: 'Оценить',
        addToBasket: 'Добавить в корзину'
    },
    basketScreen: {
        basket: 'Корзина',
        empty: 'Тут ничего нет',
        createOrder: 'Оформить заказ',
        total: 'Игото:'
    },
    userScreen: {
        profile: 'Профиль'
    },
    errors: {
        somethingWentWrong: 'Что-то пошло не так'
    },
    ratingModal: {
        rateProduct: 'Оценить товар'
    },
    orderModal: {
        confirm: 'Подтвердить',
        successful: 'Заказ успешно оформлен!',
        clarificationOfDetails: 'В течение 15 минут с вами свяжется менеджер для уточнения деталей доставки',
        goodDay: 'Хорошего дня!',
        numberOfPositions: (count: number) => `Оформить заказ из ${count} позиции(й)`,
        total: (total: number) => `Общей суммой на ${total} ₽`
    }
};
