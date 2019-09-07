module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            // 允许在全局作用域下使用 return 语句
            "globalReturn": true,
            // impliedStric
            // "impliedStrict": true,
            // 启用 JSX
            "jsx": true,
            "modules": true
        }
    },
    plugins: ["react"],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    settings: {
        "react": {
            "pragma": "React",  // Pragma to use, default to "React"
            "version": "detect", // React version. "detect" automatically picks the version you have installed.
        },
    },
    // extends: 'google',
    env: {
        browser: true,
    },
    rules: {
        // "quotes": ["error", "double"],
        // "semi": ["error", "always"],
        "linebreak-style": 'off',
        // "no-console": "error",
        "arrow-parens": 0,
        "no-caller": 2,
        "no-undef": 2,
        "no-unused-vars": [0, {
            "vars": "all",
            "args": "none"
        }],
        "no-redeclare":0,
        "no-extra-semi":0,
        "no-unreachable":0,
        "no-console":0,
        "no-useless-escape":0,
        "no-dupe-keys":0,
        "no-constant-condition":0,
        "no-empty":0,
        "no-self-assign":0,
        "no-irregular-whitespace":0,
        "no-sparse-arrays":0,
        "no-case-declarations":0,
        "no-extra-boolean-cast":0,
        "no-cond-assign":0,
        "react/prop-types": 0,
        "react/display-name":0
    },
    "globals": {
        "$": true,
        "_LANG": true,
        "Ext":true,
        "spop":true,
        "introJs":true,
        "GLB":true,
        "Set":true,
        "pageGLB":true,
        "GLBparam":true,
        "GlobalParameter":true,
        "_DECIMALCONFIG":true,
        "require":true,
        "_CDNPATH":true,
        "getCLodop":true,
        "TbCainiao":true,
        "plupload":true,
        "iGLB":true,
        "Go":true,
        "expire":true,
        "key":true,
        "moxie":true,
        "jQuery":true,
        "_LANGTYPE":true,
        "CLODOP":true,
        "Promise":true,
        "strHtmFireFox":true,
        "WxLogin":true,
        "TEMPEval":true,
        "stockPrtTpl":true,
    }
}