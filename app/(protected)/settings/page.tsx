import { auth, signOut } from '@/auth';

async function SettingPage() {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <button>Sign Out</button>
      </form>
    </div>
  );
}

export default SettingPage;
