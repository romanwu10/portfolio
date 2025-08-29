import classes from "./Privacy.module.css";

const Privacy = () => {
  return (
    <article className={classes.container}>
      <div className={classes.inner}>
        <h1 className={classes.title}>Privacy Policy for Gemini Enhancer</h1>
        <p className={classes.subtitle}>Last updated: August 29, 2025</p>

        <section className={classes.section}>
          <h2>Overview</h2>
          <p>
            Gemini Enhancer is a Chrome extension that streamlines composing
            prompts on gemini.google.com. This policy explains what data the
            extension handles and how it is protected.
          </p>
        </section>

        <section className={classes.section}>
          <h2>What data we handle</h2>
          <ul className={classes.list}>
            <li>
              Slash commands you create: stored using Chrome’s
              <code className={classes.code}> storage.sync </code>
              so they can optionally sync across your devices via your Google
              account. This data is managed by Chrome Sync, not sent to the
              developer.
            </li>
            <li>
              Draft text autosave: stored per‑URL in Chrome’s
              <code className={classes.code}> storage.local </code>
              on your device so your message is restored after reloads or
              browser restarts.
            </li>
          </ul>
          <p>
            We do not collect or receive: names, emails, chat transcripts,
            browsing history, IP addresses, analytics, or any other personal
            identifiers.
          </p>
        </section>

        <section className={classes.section}>
          <h2>How data is used</h2>
          <ul className={classes.list}>
            <li>
              All processing happens locally in your browser. Selected text and
              input content are used only to insert prompts into the chat box.
            </li>
            <li>
              Data is never transmitted to any developer‑controlled server. For
              <code className={classes.code}> storage.sync </code>, Chrome may
              store a copy in your Google account for sync; it is encrypted in
              transit and can be end‑to‑end encrypted if you set a sync
              passphrase.
            </li>
          </ul>
        </section>

        <section className={classes.section}>
          <h2>Permissions and scope</h2>
          <ul className={classes.list}>
            <li>
              <code className={classes.code}>host_permissions: *://gemini.google.com/*</code>
              — required to run the content script on Gemini pages only.
            </li>
            <li>
              <code className={classes.code}>storage</code> — needed to save your
              slash commands (sync) and drafts (local).
            </li>
            <li>
              <code className={classes.code}>activeTab</code> and
              <code className={classes.code}> tabs</code> — used only to target
              the current Gemini tab and refresh UI state after direct user
              interaction. No reading of other sites.
            </li>
          </ul>
          <p>
            The extension does not inject or load remote code, use dynamic
            imports from the network, or request additional origins.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Data retention and control</h2>
          <ul className={classes.list}>
            <li>
              Slash commands persist until you edit or delete them in the popup
              or clear Chrome data.
            </li>
            <li>
              Drafts are overwritten as you type and may be automatically
              removed when the input becomes empty. You can also clear them by
              clearing site data or uninstalling the extension.
            </li>
          </ul>
        </section>

        <section className={classes.section}>
          <h2>Sharing</h2>
          <ul className={classes.list}>
            <li>No sale or sharing of data with third parties.</li>
            <li>No advertising, analytics, or tracking libraries.</li>
          </ul>
        </section>

        <section className={classes.section}>
          <h2>Children’s privacy</h2>
          <p>
            The extension is for general audiences and does not knowingly
            collect information from children under 13.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Changes</h2>
          <p>
            If this policy changes, the "Last updated" date will be revised.
            Material changes will be reflected in the Web Store listing and
            repository.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Contact</h2>
          <p>
            Questions? Use the developer contact information on the Chrome Web
            Store listing or the repository issue tracker.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Summary</h2>
          <ul className={classes.list}>
            <li>No personal data collection or transmission to the developer</li>
            <li>Storage limited to user commands (sync) and drafts (local)</li>
            <li>Runs only on gemini.google.com with minimal permissions</li>
          </ul>
        </section>
      </div>
    </article>
  );
};

export default Privacy;

