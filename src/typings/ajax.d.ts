declare namespace Ajax {

  // axios 返回数据
  export interface AxiosResponse {
    // 服务端返回的数据
    data: AjaxResponse;
    // 服务端返回的状态码
    status: number,
    // 服务端返回的状态信息
    statusText: string,
    // 响应头
    // 所有的响应头名称都是小写
    headers: any,
    // axios请求配置
    config: any,
    // 请求
    request: any
  }

  // 后端接口数据格式
  export interface AjaxResponse {
    /**
     * 状态码
     * @type { number }
     */
    code?: number;

    /**
     * 数据
     * @type { any }
     */
    result?: any;

    /**
     * 消息
     * @type { string }
     */
    message?: string
  }
}
