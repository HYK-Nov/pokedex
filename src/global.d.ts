// module.scss 사용
declare module "*.scss" {
    const content: { [className: string]: string };
    export = content;
}