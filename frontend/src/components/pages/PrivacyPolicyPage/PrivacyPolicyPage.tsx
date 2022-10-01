import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const PrivacyPolicyPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>プライバシーポリシー | Badge Generator</title>
      </Head>

      <div className="space-y-4">
        <div>
          <h2 className="mb-2 text-2xl font-bold">
            アクセス解析ツールについて
          </h2>
          <p>
            当サイトでは、 Google によるアクセス解析ツール「 Google
            アナリティクス」を利用しています。この Google
            アナリティクスはトラフィックデータの収集のために Cookie
            を使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能は
            Cookie
            を無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは{" "}
            <a
              className="text-blue-600"
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Google アナリティクス利用規約
            </a>{" "}
            を参照してください。
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-2xl font-bold">
            プライバシーポリシーの変更について
          </h2>
          <p>
            当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。
          </p>
        </div>
      </div>
    </div>
  );
};

PrivacyPolicyPage.displayName = "PrivacyPolicyPage";

export default PrivacyPolicyPage;
